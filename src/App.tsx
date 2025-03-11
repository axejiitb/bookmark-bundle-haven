
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookmarkProvider } from "./contexts/BookmarkContext";
import ExtensionPopup from "./pages/ExtensionPopup";

const App = () => (
  <BookmarkProvider>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExtensionPopup />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </BookmarkProvider>
);

export default App;
