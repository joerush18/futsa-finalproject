import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import TProvider from "./providers/TProvider.tsx";
import TanstackProvider from "./providers/TanstackProvider.tsx";
import { ToastProvider } from "./store/ToastContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TanstackProvider>
      <BrowserRouter>
        <TProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </TProvider>
      </BrowserRouter>
    </TanstackProvider>
  </React.StrictMode>
);
