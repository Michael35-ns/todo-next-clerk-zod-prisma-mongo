"use server";

import { prisma } from "@/libs/prismadb";
import { revalidatePath } from "next/cache";
import { todoZodSchema } from "../schema/todo.zod.schema";
import { ZodError } from "zod";
import { auth } from "@clerk/nextjs/server";

interface TodoResponse {
  success: boolean;
  message: string;
}

export const createTodo = async (title: string): Promise<TodoResponse> => {
  try {
    todoZodSchema.parse({ title });

    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "User is not authenticated",
      };
    }
    await prisma.todo.create({
      data: {
        title,
        userId,
      },
    });
    revalidatePath("/todo");
    return {
      success: true,
      message: "To do created succesfully (backend)",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }
    return {
      success: false,
      message: "Error creating todo",
    };
  }
};

export const removeTodo = async (id: string) => {
  if (!id || !id.trim()) {
    return {
      error: "Id is required",
    };
  }
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath("/todo");
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Error removing todo",
    };
  }
};
