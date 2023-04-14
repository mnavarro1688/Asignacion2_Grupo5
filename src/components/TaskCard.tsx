import { useTasks } from '../context/TaskContext';
import { useRouter } from "next/navigation";
import { VscTrash } from "react-icons/vsc";
import { toast } from "react-hot-toast";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
  };
}

export const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  const { deleteTask } = useTasks();
  const router = useRouter();

  const { createSubTask, deleteSubTask, subTasks } = useTasks();
  const subTaskTemp = subTasks.filter(stasks => stasks.idTask === task.id);

  const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if(subTaskTemp.length ===0)
    {
      const accept = confirm("Esta seguro de que quiere eliminar esta tarea?");
      if (accept) {
        deleteTask(task.id);
        toast.success("Tarea Eliminada correctamente");
      }
    }
    else{
      toast.error("La tarea no puede ser eliminada por que posee sub tareas");
    }
    
  };

  return (
    <div
      className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-20 py-5 m-2 flex justify-between"
      onClick={() => router.push(`/edit/${task.id}`)}
    >
      <div>
        <div className="flex justify-between">
          <h1 className="font-bold">{task.title}</h1>
          <button
            className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center"
            onClick={handleDeleteTask}
          >
            <VscTrash className="mr-2" /> Eliminar
          </button>
        </div>
        <p className="text-gray-300">{task.description}</p>
        <span className="text-gray-400 text-xs">{task.id}</span>
      </div>
    </div>
  );
};
