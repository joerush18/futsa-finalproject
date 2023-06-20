import { z } from "zod";

const SignUpSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
});

const OTPSchema = z.object({
  OTP: z.number().min(6, { message: "OTP must be at least 6 characters long" }),
});

const LoginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const PasswordSetSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
export { SignUpSchema, OTPSchema, LoginSchema, PasswordSetSchema };
