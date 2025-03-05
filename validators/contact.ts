import { z } from "zod";
import validator from "validator";

export const contactValidator = z.object({
  firstName: z.string().min(1, "Il nome è obbligatorio."),
  lastName: z.string().min(1, "Il cognome è obbligatorio."),
  email: z
    .string()
    .min(1, "L'email è obbligatoria.")
    .refine((value) => validator.isEmail(value), {
      message: "Email non valida.",
    }),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || validator.isMobilePhone(value, "any"), {
      message: "Numero di telefono non valido.",
    }),
  birthDate: z
    .instanceof(Date)
    .optional()
    .refine((value) => !value || validator.isDate(value.toString()), {
      message: "Data di nascita non valida.",
    }),
  address: z.string().optional(),
  language: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export default contactValidator;
