import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { InlogTelefoon } from "./screens/InlogTelefoon";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <InlogTelefoon />
  </StrictMode>,
);
