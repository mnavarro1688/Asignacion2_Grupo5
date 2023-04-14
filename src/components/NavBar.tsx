"use client";

import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useTasks } from '../context/TaskContext';

export function Navbar() {
  const router = useRouter();
  const { tasks } = useTasks();

  return (
    <header className="flex items-center bg-gray-800 px-28 py-3">
     <Link href="/">
        <h1 className="font-black text-3xl text-white">Asignacion 2</h1>
      </Link>

      <span className="ml-2 text-gray-400 font-bold">{tasks.length} tareas</span>

      <div className="flex-grow text-right">
        <button
          className="bg-blue-500 hover:bg-blue-400 px-5 py-2 text-gray font-bold rounded-sm inline-flex items-center"
          onClick={() => router.push("/new")}
        >
          <AiOutlinePlus className="mr-2" />
          Agregar Tarea
        </button>
      </div>
    </header>
  );
}
