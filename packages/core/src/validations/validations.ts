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

const MemberSchema = z.object({
  memberName: z.string().min(1, { message: "Required" }),
  gender: z.string().min(1, { message: "Required" }),
  age: z.string().min(1, { message: "Required" }),
  position: z.string().min(1, { message: "Required" }),
  jerseyNumber: z.string().min(1, { message: "Required" }),
  email: emailSchema,
  phoneNumber: z.string().min(1, { message: "Required" }),
});

const TeamSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  members: z.array(MemberSchema),
  ownerId: z.string().min(1, { message: "Required" }),
  verified: z.boolean(),
});

export {
  SignUpSchema,
  OTPSchema,
  LoginSchema,
  PasswordSetSchema,
  EventSchema,
  MemberSchema,
  TeamSchema,
};
