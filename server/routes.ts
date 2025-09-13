import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body against the schema
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store the contact form submission
      const contact = await storage.createContact(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        data: {
          id: contact.id,
          submittedAt: contact.submittedAt
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Return validation errors
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        console.error('Contact form submission error:', error);
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  // Get all contact submissions (for admin use)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json({
        success: true,
        data: contacts
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Get specific contact by ID
  app.get("/api/contact/:id", async (req, res) => {
    try {
      const contact = await storage.getContact(req.params.id);
      if (!contact) {
        res.status(404).json({
          success: false,
          message: "Contact not found"
        });
        return;
      }
      
      res.json({
        success: true,
        data: contact
      });
    } catch (error) {
      console.error('Error fetching contact:', error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // Update contact status
  app.patch("/api/contact/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!["new", "reviewed", "contacted", "closed"].includes(status)) {
        res.status(400).json({
          success: false,
          message: "Invalid status"
        });
        return;
      }

      const contact = await storage.updateContactStatus(req.params.id, status);
      if (!contact) {
        res.status(404).json({
          success: false,
          message: "Contact not found"
        });
        return;
      }

      res.json({
        success: true,
        data: contact
      });
    } catch (error) {
      console.error('Error updating contact status:', error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
