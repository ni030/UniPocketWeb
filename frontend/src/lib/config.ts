export const config = {
  API_URL: `${import.meta.env.VITE_API_URL || "http://localhost:5200"}/api/v1`,
  CLERK: `${import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}`,
};
