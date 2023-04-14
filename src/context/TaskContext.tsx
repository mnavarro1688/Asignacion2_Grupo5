"use client";
import React , { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface SubTask {
  id: string;
  title: string;
  description: string;
  idTask: string;
}

interface TaskContextValue {
  tasks: Task[];
  createTask: (title: string, description: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  subTasks: SubTask[];
  createSubTask: (title: string, description: string, idTask: string) => void;
  updateSubTask: (id: string, updatedTask: Partial<SubTask>) => void;
  deleteSubTask: (id: string) => void;
}

interface props {
  children : JSX.Element | JSX.Element[];
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks debe usarse con un TasksProvider");
  return context;
};

export const TasksProvider = ( {children}:props ) => {
  // save in localStorage
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [subTasks, setSubTasks] = useLocalStorage<SubTask[]>("subTasks", []);

  const createTask = (title: string, description: string) =>
    setTasks([...tasks, { id: uuid(), title, description }]);

  const updateTask = (id: string, updatedTask: Partial<Task>) =>
    setTasks([
      ...tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    ]);

  const deleteTask = (id: string) =>
    setTasks([...tasks.filter((task) => task.id !== id)]);

  const createSubTask = (title: string, description: string, idTask:string) =>
    setSubTasks([...subTasks, { id: uuid(), title, description,idTask }]);

  const updateSubTask = (id: string, updatedSubTask: Partial<SubTask>) =>
    setSubTasks([
      ...subTasks.map((subTask) =>
        subTask.id === id ? { ...subTask, ...updatedSubTask } : subTask
      ),
    ]);

  const deleteSubTask = (id: string) =>
    setSubTasks([...subTasks.filter((subTask) => subTask.id !== id)]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        subTasks,
        createSubTask,
        updateSubTask,
        deleteSubTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
