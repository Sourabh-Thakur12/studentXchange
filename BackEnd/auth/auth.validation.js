const { z } = require("zod");

const collegeEmailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address.")
    .refine((email) => email.endsWith("@ddu.du.ac.in"), {
        message: "Only @ddu.du.ac.in email addresses are allowed.",
    });

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(256, "Password must not exceed 256 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.");

const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters long.")
        .max(128, "Name must not exceed 128 characters."),
    email: collegeEmailSchema,
    password: passwordSchema,
});

const loginSchema = z.object({
    email: collegeEmailSchema,
    password: z.string().min(1, "Password is required."),
});

const verifyEmailSchema = z.object({
    userId: z.string().min(1, "User ID is required."),
    secret: z.string().min(1, "Verification secret is required."),
});

module.exports = {
    loginSchema,
    registerSchema,
    verifyEmailSchema,
};
