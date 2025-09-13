import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact Form Schema and Types
export const contactFormSchema = z.object({
  // Personal Information
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  
  email: z.string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .max(100, "Email address cannot exceed 100 characters"),
  
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^[\+]?[\d\s\-\(\)\.]+$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  
  // Company Information
  company: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  
  industry: z.enum([
    "technology", "healthcare", "finance", "real-estate", "manufacturing", 
    "retail", "consulting", "education", "non-profit", "startup", "other"
  ]).optional(),
  
  companySize: z.enum([
    "1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"
  ]).optional(),
  
  // Service and Project Information
  service: z.enum([
    "financial-analysis", "tax-planning", "risk-management", "investment-planning",
    "business-consulting", "accounting-services", "compliance-audit", "other"
  ]),
  
  projectType: z.enum([
    "one-time", "ongoing", "consultation", "audit", "analysis", "planning"
  ]).optional(),
  
  budgetRange: z.enum([
    "under-5k", "5k-15k", "15k-50k", "50k-100k", "100k-250k", "250k+"
  ]).optional(),
  
  timeline: z.enum([
    "asap", "1-month", "1-3-months", "3-6-months", "6-12-months", "flexible"
  ]).optional(),
  
  // Contact Preferences
  contactMethod: z.enum(["email", "phone", "meeting"]),
  
  // Message
  subject: z.string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject cannot exceed 100 characters"),
  
  message: z.string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
  
  // Additional Information
  hearAboutUs: z.enum([
    "google", "linkedin", "referral", "website", "social-media", "other"
  ]).optional(),
  
  // Consent and Marketing
  newsletter: z.boolean().default(false),
  privacyConsent: z.boolean()
    .refine(val => val === true, "You must agree to the privacy policy"),
});

export const insertContactSchema = contactFormSchema.extend({
  id: z.string().uuid().optional(),
  submittedAt: z.date().optional(),
  status: z.enum(["new", "reviewed", "contacted", "closed"]).default("new"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;

// Contact form display labels and options
export const serviceOptions = {
  "financial-analysis": "Financial Analysis & Reporting",
  "tax-planning": "Tax Planning & Strategy",
  "risk-management": "Risk Assessment & Management",
  "investment-planning": "Investment Planning & Advisory",
  "business-consulting": "Business Strategy Consulting",
  "accounting-services": "Accounting & Bookkeeping Services",
  "compliance-audit": "Compliance & Audit Services",
  "other": "Other Services"
} as const;

export const industryOptions = {
  "technology": "Technology",
  "healthcare": "Healthcare",
  "finance": "Financial Services",
  "real-estate": "Real Estate",
  "manufacturing": "Manufacturing",
  "retail": "Retail",
  "consulting": "Consulting",
  "education": "Education",
  "non-profit": "Non-Profit",
  "startup": "Startup",
  "other": "Other"
} as const;

export const companySizeOptions = {
  "1-10": "1-10 employees",
  "11-50": "11-50 employees",
  "51-200": "51-200 employees",
  "201-500": "201-500 employees",
  "501-1000": "501-1000 employees",
  "1000+": "1000+ employees"
} as const;

export const budgetRangeOptions = {
  "under-5k": "Under $5,000",
  "5k-15k": "$5,000 - $15,000",
  "15k-50k": "$15,000 - $50,000",
  "50k-100k": "$50,000 - $100,000",
  "100k-250k": "$100,000 - $250,000",
  "250k+": "$250,000+"
} as const;

export const timelineOptions = {
  "asap": "As soon as possible",
  "1-month": "Within 1 month",
  "1-3-months": "1-3 months",
  "3-6-months": "3-6 months",
  "6-12-months": "6-12 months",
  "flexible": "Flexible timeline"
} as const;

export const contactMethodOptions = {
  "email": "Email",
  "phone": "Phone call",
  "meeting": "In-person meeting"
} as const;

export const projectTypeOptions = {
  "one-time": "One-time project",
  "ongoing": "Ongoing relationship",
  "consultation": "Initial consultation",
  "audit": "Audit/Review",
  "analysis": "Analysis project",
  "planning": "Strategic planning"
} as const;
