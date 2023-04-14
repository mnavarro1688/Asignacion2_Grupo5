import { useRouter } from "next/navigation";
import { VscTrash } from "react-icons/vsc";
import { toast } from "react-hot-toast";
import { useTasks } from "../context/TaskContext";

interface SubTaskCardProps {
  SubTask: {
    id: string;
    title: string;
    description: string;
    idTask:string;
  };
}

export const SubTaskCard = ({ SubTask }: SubTaskCardProps): JSX.Element => {
  const { deleteSubTask } = useTasks();
  const router = useRouter();

  const handleDeleteSubTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const accept = confirm("Esta seguro de que quiere eliminar esta subtarea?");
    if (accept) {
      deleteSubTask(SubTask.id);
      toast.success("Sub Tarea Eliminada correctamente");
    }
  };

  return (
    <div
      className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-20 py-5 m-2 flex justify-between"
    >
      <div>
        <div className="flex justify-between">
          <h1 className="font-bold">{SubTask.title}</h1>
          <button
            className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center"
            onClick={handleDeleteSubTask}
          >
            <VscTrash className="mr-2" /> Eliminar
          </button>
        </div>
        <p className="text-gray-300">{SubTask.description}</p>
        <span className="text-gray-400 text-xs">{SubTask.id}</span>
      </div>
    </div>
  );
};
