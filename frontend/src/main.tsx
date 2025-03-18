import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

import { QueryProvider } from "./providers/query-provider.tsx";

import { ClerkProvider } from '@clerk/clerk-react';

import ComplaintPage from "./pages/ComplaintPage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import RoomPage from "./pages/RoomPage.tsx";
import EventPage from "./pages/EventPage.tsx";
import FacilityPage from "./pages/FacilityPage.tsx";
import MeritPage from "./pages/MeritPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import { config } from "./lib/config.ts";



const PUBLISHABLE_KEY = config.CLERK;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryProvider>
        <Toaster richColors />
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            {/* Root Layout */}
            <Route element={<RootLayout />}>
              <Route index element={<DashboardPage />} />
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
    </ClerkProvider>
  </StrictMode>
);
