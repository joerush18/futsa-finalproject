import { z } from "zod";
import {
  confirmSchema,
  emailSchema,
  fullNameSchema,
  passwordSchema,
  phoneNumberSchema,
} from "./schema";

const SignUpSchema = z
  .object({
    fullName: fullNameSchema,
    phoneNumber: phoneNumberSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const OTPSchema = z.object({
  OTP: z.number().min(6, { message: "OTP must be at least 6 characters long" }),
});

const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const PasswordSetSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export { SignUpSchema, OTPSchema, LoginSchema, PasswordSetSchema };
