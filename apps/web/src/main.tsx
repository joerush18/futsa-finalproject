import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import TProvider from "./providers/TProvider.tsx";
import TanstackProvider from "./providers/TanstackProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <TProvider>
        <TanstackProvider>
          <App />
        </TanstackProvider>
      </TProvider>
    </BrowserRouter>
  </React.StrictMode>
);
