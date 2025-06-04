"use client";
import { useRef } from "react";
import { createTodo } from "../actions/todo.action";
import ButtonForm from "./button.form.todo";
import toast from "react-hot-toast";
import { todoZodSchema } from "../schema/todo.zod.schema";
import { ZodError } from "zod";

const FormTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: FormData) => {
    
    const title = data.get("title") as string;

    try {
      todoZodSchema.parse({ title });
      const resBackend = await createTodo(title);

      if (!resBackend.success) {
        toast.error(resBackend.message);
        return;
      }

    } catch (error) {

      if (error instanceof ZodError) {
        error.issues.map((issue) => toast.error(issue.message));
        return;
      }

    } finally {
      formRef.current?.reset();
    }
  };

  return (
    <form ref={formRef} action={handleSubmit}>
      <div className="flex justify-center items-center">
        <div className="flex flex-col space-y-2 w-1/3 container rounded-xl shadow-2xl p-2">
          <div className="p-4">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write a ToDo"
            />
          </div>
          <ButtonForm />
        </div>
      </div>
    </form>
  );
};

export default FormTodo;
