import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2),
  source: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  followUpAt: z.string().optional()
});

export const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  title: z.string().optional()
});

export const companySchema = z.object({
  name: z.string().min(2),
  domain: z.string().optional(),
  industry: z.string().optional(),
  size: z.string().optional()
});

export const dealSchema = z.object({
  name: z.string().min(2),
  amount: z.coerce.number().positive(),
  expectedClose: z.string().optional()
});

export const taskSchema = z.object({
  title: z.string().min(3),
  dueAt: z.string().min(1),
  priority: z.enum(["low", "medium", "high"]).default("medium")
});
