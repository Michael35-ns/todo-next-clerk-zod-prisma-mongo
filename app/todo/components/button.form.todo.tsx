"use client";
import { useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa6";
const ButtonForm = () => {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center items-center">
      <button
        type="submit"
        className="flex justify-center items-center gap-2 rounded-xl bg-indigo-400 hover:bg-indigo-700 font-semibold text-white mb-2 p-2 w-1/4 ">
        {pending ? (
          <>
            <FaSpinner className="animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <FaUpload />
            Add
          </>
        )}
      </button>
    </div>
  );
};

export default ButtonForm;
