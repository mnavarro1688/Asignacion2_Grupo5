"use client";
import React , { useEffect } from "react";
import { useTasks} from '../../context/TaskContext';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


interface TaskFormPageProps {
  params: {
    id?: string;
  };
}

interface TaskFormValues {
  title: string;
  description: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
  }

const TaskFormPage: React.FC<TaskFormPageProps> = ({ params }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskFormValues>();
  const { createTask, updateTask, tasks } = useTasks();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    if (!params.id) {
      createTask(data.title, data.description);
      toast.success("Tarea agregada correctamente");
    } else {
      updateTask(params.id, data);
      toast.success("Tarea actualizada correctamente");
    }
    router.push('/');
  });

  const taskFound = tasks.find((task: Task) => task.id === params.id);

  useEffect(() => {
    if (taskFound) {
      setValue("title", taskFound.title);
      setValue("description", taskFound.description);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <form className="bg-gray-700 p-10" onSubmit={onSubmit}>
        <h1 className="text-3xl mb-3">
          {params.id ? "Editar Tarea" : "Nueva Tarea"}
        </h1>
        <input
          type="text"
          className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-2 block"
          placeholder="Ingrese el Titulo de la tarea"
          autoFocus
          //name="title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="block text-red-400 mb-2">
            Este campo es requerido
          </span>
        )}

        <textarea
          cols={2}
          placeholder="Ingrese la descripcion"
          className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-1 block"
          //name="description"
          {...register("description", { required: true })}
          name="description"
        />
        {errors.description && (
          <span className="block text-red-400 mb-2">
            Este campo es requerido
          </span>
        )}

        <button className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-sm disabled:opacity-30">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default TaskFormPage;
