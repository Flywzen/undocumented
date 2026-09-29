/* Editorial Terminal: app shell stays quiet so the curriculum and its index carry the experience. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import SyllabusStage from "./pages/SyllabusStage";

export default function App() {
  const isStage = window.location.pathname.startsWith("/path/");
  return <ErrorBoundary><ThemeProvider defaultTheme="light" switchable><TooltipProvider><Toaster/>{isStage ? <SyllabusStage/> : <Home/>}</TooltipProvider></ThemeProvider></ErrorBoundary>;
}

