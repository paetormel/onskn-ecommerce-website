import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./app.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./shared/lib/queryClient";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./shared/context/authContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
