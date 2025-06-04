import { prisma } from "@/libs/prismadb";
import FormTodo from "./todo/components/form.todo";
import ListTodo from "./todo/components/list.todo";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
const TodoPage = async () => {
  const user = await currentUser();

  const { userId, redirectToSignIn } = await auth();
  if (!user?.id || !userId) return redirectToSignIn();

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mb-3 p-12">
        Todos: {user.username}
      </h1>
      <FormTodo />
      <div className="p-20 flex justify-center items-center">
        <ListTodo todos={todos} />
      </div>
    </div>
  );
};

export default TodoPage;
