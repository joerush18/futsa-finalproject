import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .max(20, "Password cannot exceed 20 characters");

const confirmSchema = z.string();

const emailSchema = z.string().email({ message: "Invalid email address" });

const phoneNumberSchema = z
  .string()
  .min(10, { message: "Phone number must be at least 10 characters long" });

const fullNameSchema = z
  .string()
  .min(3, { message: "Full name must be at least 3 characters long" })
  .refine((value) => {
    const trimmedValue = value.trim();
    const spaceIndex = trimmedValue.indexOf(" ");
    return spaceIndex > 0 && spaceIndex < trimmedValue.length - 1;
  }, "Fullname should have at least one space between first and last name");

export {
  passwordSchema,
  confirmSchema,
  emailSchema,
  phoneNumberSchema,
  fullNameSchema,
};
