"use client";
import React , { useEffect, useState } from "react";
import { useTasks} from '../../../context/TaskContext';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { VscTasklist } from "react-icons/vsc";
import { SubTaskCard } from "../../../components/SubTaskCard";


interface TaskFormPageProps {
  params: {
    id?: string;
  };
}

interface TaskFormValues {
  title: string;
  description: string;
  titleSubTask: string;
  descriptionSubTask: string;
  idtask: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
  }

interface SubTask {
    id: string;
    title: string;
    description: string;
    idTask:string;
  }

const SubTaskFormPage: React.FC<TaskFormPageProps> = ({ params }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskFormValues>();
  const { createTask, updateTask, tasks } = useTasks();
  const { createSubTask, deleteSubTask, subTasks } = useTasks();
  const router = useRouter();

  const onSubmitEdit = handleSubmit((data) => {
    if (!params.id) {
      createTask(data.title, data.description);
      toast.success("Tarea agregada correctamente");
    } else {
      updateTask(params.id, data);
      toast.success("Sub Tarea actualizada correctamente");
    }
  });

 const onSubmit = handleSubmit((data) => {
    createSubTask(data.titleSubTask, data.descriptionSubTask, data.idtask);
    toast.success("Tarea agregada correctamente");
    setValue ("titleSubTask",'');
    setValue ("descriptionSubTask",'');
  });

  const taskFound = tasks.find((task: Task) => task.id === params.id);

  const subTaskTemp = subTasks.filter(stasks => stasks.idTask === taskFound?.id);

  useEffect(() => {
    if (params.id) {
      if (taskFound) {
        setValue("title", taskFound.title);
        setValue("description", taskFound.description);
        setValue("idtask",taskFound.id);
      }
    }
  }, []);



  return (
    <div className="flex justify-center items-center h-full">
      <form className="bg-gray-700 p-10" onSubmit={onSubmitEdit}>
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
    
    <br></br>

      <form className="bg-gray-700 p-10" onSubmit={onSubmit}>
        <h1 className="text-3xl mb-3">
          Agregar Sub Tarea
        </h1>
        <input
          type="text"
          className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-2 block"
          placeholder="Ingrese el Titulo de la tarea"
          autoFocus
          //name="titleSubTask"
          {...register("titleSubTask", { required: true })}
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
          //name="descriptionSubTask"
          {...register("descriptionSubTask", { required: true })}
        />
        {errors.description && (
          <span className="block text-red-400 mb-2">
            Este campo es requerido
          </span>
        )}

        <button className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-sm disabled:opacity-30">
          Agregar
        </button>
      </form>
      <div className="flex justify-center">
            {tasks.length === 0 ? (
                <div className="block">
                    <h2 className="text-2xl">No hay sub tareas agregadas</h2>
                    <VscTasklist size="8rem" />
                </div>
            ) : (
            <div className="w-7/10">
                {
                    //subTasks.filter(stask => stask.idTask = taskFound.id);
                    subTaskTemp.map((stask, i) => (
                    <SubTaskCard SubTask={stask} key={i} />
                    ))
                }
            </div>
        )}
        </div>      
    </div>
    
    
  );
};

export default SubTaskFormPage;