import { ITodo } from "../interfaces/todo.interface";
import ItemTodo from "./item.todo";

interface Props {
  todos: ITodo[];
}

const ListTodo = ({ todos }: Props) => {
  if (!todos.length)
    return <div className="text-center text-2xl">No hay Tareas</div>;
  return (
    <div className="container p-4 shadow-2xl w-4/5 space-y-4 rounded-2xl">
      {todos.map((todo) => (
        <ItemTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default ListTodo;
