import { z } from 'zod';

export const registerSchema = z.object({
    fullName: z
    .string({ error: "fullname is required"})
    .trim()
    .min(1, {error: 'fullname is required'})
    .max(100, {error: "fullname must not exced 100 characters"}),


    email: z
    .string({ error: "email is required" })
    .trim()
    .min(1, { error: "email is required" })
    .toLowerCase()
    .pipe(z.email({ error: "Invalid email format" })),

    password: z
    .string({error: 'password is required'})
    .min(8, {error: 'Password must be at least 8 characters long'})
    .max(72, {error: "Password must not exceed 72 characters"})
 })


 export const loginSchema = z.object({
    email: z
    .string({error: 'email is required'})
    .trim()
    .min(1, {error: 'email is required'})
    .toLowerCase()
    .pipe(z.email({error: 'Invalid email format'})),

    password: z
    .string({error: 'password is required'})
    .min(8,{error: 'Password must be at least 8 characters long'})
    .max(72, {error: "Password must no exceed 72 characters"})
 })
