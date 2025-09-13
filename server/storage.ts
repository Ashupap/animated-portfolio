import { type User, type InsertUser, type ContactFormData, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  createContact(contact: ContactFormData): Promise<InsertContact>;
  getContact(id: string): Promise<InsertContact | undefined>;
  getAllContacts(): Promise<InsertContact[]>;
  updateContactStatus(id: string, status: "new" | "reviewed" | "contacted" | "closed"): Promise<InsertContact | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, InsertContact>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(contactData: ContactFormData): Promise<InsertContact> {
    const id = randomUUID();
    const contact: InsertContact = {
      ...contactData,
      id,
      submittedAt: new Date(),
      status: "new"
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContact(id: string): Promise<InsertContact | undefined> {
    return this.contacts.get(id);
  }

  async getAllContacts(): Promise<InsertContact[]> {
    return Array.from(this.contacts.values())
      .sort((a, b) => (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0));
  }

  async updateContactStatus(id: string, status: "new" | "reviewed" | "contacted" | "closed"): Promise<InsertContact | undefined> {
    const contact = this.contacts.get(id);
    if (contact) {
      contact.status = status;
      this.contacts.set(id, contact);
      return contact;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
