import "./global.css";
import { Navbar } from '../components/NavBar';
import { TasksProvider } from '../context/TaskContext';
import { Toaster } from "./Toaster";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Tasks App",
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html>
      <body>
        <TasksProvider>
          <Navbar />
          <div className="bg-gray-900 text-white h-[calc(100vh-4rem)]">
            <main className="h-5/6 px-28 py-10">{children}</main>
          </div>
        </TasksProvider>
        <Toaster />
      </body>
    </html>
  );
}

