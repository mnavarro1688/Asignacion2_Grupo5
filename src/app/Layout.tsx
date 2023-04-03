import "./global.css";
import { Layout } from "../components/Layout";
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
          <Layout>{children}</Layout>
        </TasksProvider>
        <Toaster />
      </body>
    </html>
  );
}

