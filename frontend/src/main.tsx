import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router";

import { QueryProvider } from "./providers/query-provider.tsx";

import ComplaintPage from "./pages/ComplaintPage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import RoomPage from "./pages/RoomPage.tsx";
import EventPage from "./pages/EventPage.tsx";
import FacilityPage from "./pages/FacilityPage.tsx";
import MeritPage from "./pages/MeritPage.tsx";
import UserPage from "./pages/UserPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          {/* Root Layout */}
          <Route element={<RootLayout />}>
            <Route index element={<App />} />
            <Route path="/rooms" element={<RoomPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/complaints" element={<ComplaintPage />} />
            <Route path="/facilities" element={<FacilityPage />} />
            <Route path="/merit" element={<MeritPage />} />
            <Route path="/users" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>
);
