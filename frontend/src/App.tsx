import { BrowserRouter, useLocation } from "react-router-dom";
import { LoadingProvider } from "@/context/LoadingContext";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppRoutes } from "@/routes/AppRoutes";
import { ScrollToTop } from "@/components/utility/ScrollToTop";

function Shell() {
  useLocation();

  return (
    <>
      <div className="noise-overlay" />
      <SkipToContent />
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <div id="main-content" tabIndex={-1}>
        <AppRoutes />
      </div>
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