import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LogIn } from "./screens/LogIn";
import { BeschikbaarIndelen } from "./screens/BeschikbaarIndelen";

export const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/dashboard" element={<BeschikbaarIndelen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
