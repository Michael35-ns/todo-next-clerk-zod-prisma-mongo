"use client";
import { useTransition } from "react";
import { ITodo } from "../interfaces/todo.interface";
import { FaRegTrashCan, FaSpinner } from "react-icons/fa6";
import { removeTodo } from "../actions/todo.action";
import toast from "react-hot-toast";
interface Props {
  todo: ITodo;
}

const ItemTodo = ({ todo }: Props) => {
  let [isPending, startTransition] = useTransition();
  const handleClickRemove = async (id: string) => {
    if (!id || !id.trim()) {
      toast.error("Invalid Id");
      return;
    }
    await removeTodo(id);
    toast.success("Removed!");
  };
  return (
    <div className="border border-gray-200 rounded mb-2 p-2 flex ">
      <span className=" grow flex items-center">{todo.title}</span>
      <button
        onClick={() => startTransition(() => handleClickRemove(todo.id))}
        className="bg-red-500 hover:bg-red-700 p-2 text-white rounded flex-none">
        {isPending ? <FaSpinner className="animate-spin" /> : <FaRegTrashCan />}
      </button>
    </div>
  );
};

export default ItemTodo;
