import { z } from "zod";

export const todoZodSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Todo min 3 carácteres" })
    .max(50, { message: "Todo max 50 carácteres" })
    .nonempty({ message: "Todo no puede estar vacío" }),
});