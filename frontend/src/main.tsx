import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import ComplaintPage from "./pages/ComplaintPage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import RoomPage from "./pages/RoomPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Root Layout */}
        <Route element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path="/complaints" element={<ComplaintPage />} />
          <Route path="/rooms" element={<RoomPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
