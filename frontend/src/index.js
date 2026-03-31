import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/home.css";
import "./styles/layout.css";
import "./styles/form.css";
import "./styles/dashboard.css";
import "./styles/quiz.css";
import "./styles/result.css";
import "./styles/admin.css";
import "./styles/resume.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);