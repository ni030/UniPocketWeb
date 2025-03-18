import { Navigate, Outlet } from "react-router";
import { MainNavbar } from "@/components/MainNavbar";
import { MainSidebar } from "@/components/MainSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@clerk/clerk-react";

const RootLayout = () => {
  const { isSignedIn, isLoaded } = useUser();

  if(!isSignedIn && isLoaded) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <SidebarProvider>
      <div className="w-full">
        <MainNavbar />
        <div className="flex min-h-screen pt-16">
          <MainSidebar />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
