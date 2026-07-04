import { BrowserRouter, useLocation } from "react-router-dom";
import { LoadingProvider } from "@/context/LoadingContext";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppRoutes } from "@/routes/AppRoutes";
import { useLenis } from "@/hooks/useLenis";

function Shell() {
  useLenis();
  useLocation(); // kept in the tree so future route-based transitions can key off it

  return (
    <>
      <div className="noise-overlay" />
      <CustomCursor />
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <LoadingScreen />
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </LoadingProvider>
  );
}
