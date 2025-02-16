import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { route } from "./route/route.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <Provider store={store}>
        <RouterProvider router={route}></RouterProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
