import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthcontextProvider } from "./context/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthcontextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthcontextProvider>
);
