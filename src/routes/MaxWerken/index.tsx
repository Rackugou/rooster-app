import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MaxWerken } from "./screens/MaxWerken";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <MaxWerken />
  </StrictMode>,
);
