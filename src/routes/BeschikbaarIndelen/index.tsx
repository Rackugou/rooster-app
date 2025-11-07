import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BeschikbaarIndelen } from "./screens/BeschikbaarIndelen";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BeschikbaarIndelen />
  </StrictMode>,
);
