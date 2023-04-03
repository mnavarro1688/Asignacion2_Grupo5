"use client";
import React , { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface SubTask {
  id: string;
  title: string;
  description: string;
  idTask: string;
}

interface TaskContextValue {
  tasks: SubTask[];
  createSubTask: (title: string, description: string) => void;
  updateTask: (id: string, updatedTask: Partial<SubTask>) => void;
  deleteTask: (id: string) => void;
}

interface props {
  children : JSX.Element | JSX.Element[];
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
};

export const TasksProvider = ( {children}:props ) => {
  // save in localStorage
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

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

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
