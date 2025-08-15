import z from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username should be longer than 3 characters')
      .max(30, 'Username should not be longer than 30 characters'),
    firstName: z
      .string()
      .min(1, 'First name should be longer than 1 character')
      .max(30, 'First name should not be longer than 30 characters ')
      .regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        'First name can only contain letters, spaces, hyphens, and apostrophes.',
      ),
    lastName: z
      .string()
      .min(1, 'Last name should be longer than 1 character')
      .max(30, 'Last name should not be longer than 30 characters ')
      .regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        'Last name can only contain letters, spaces, hyphens, and apostrophes.',
      ),
    password: z.string().min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string().nonempty(),
  })
  .refine(
    (schema) => {
      return schema.password === schema.confirmPassword;
    },
    {
      message: "Password doesn't match.",
      path: ['confirmPassword'],
    },
  );

export type SignUpSchema = z.output<typeof signUpSchema>;


