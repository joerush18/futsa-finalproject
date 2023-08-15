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

const EventSchema = z.object({
  name: z
    .string()
    .min(8, { message: "Name must be at least 8 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  eventDate: z.string(),
  endDate: z.string(),
  eventImage: z.string().min(1, { message: "Required" }),
  entryFee: z.string().min(1, { message: "Required" }),
  tournamentType: z.string(),
  gameTime: z.string().min(1, { message: "Required" }),
  numberOfPlayers: z.string().min(1, { message: "Required" }),
  hasExpired: z.boolean(),
  geoLocation: z.object({
    lat: z.string(),
    lng: z.string(),
    value: z.any(),
  }),
  prizes: z.array(z.string()),
  teams: z.array(z.string()),
});

export { SignUpSchema, OTPSchema, LoginSchema, PasswordSetSchema, EventSchema };
