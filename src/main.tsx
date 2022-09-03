import React from "react";
import ReactDOM from "react-dom/client";
import { DataBrowserRouter, Route } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Index from "./routes";
import Contact, {
  action as contactAction,
  loader as contactLoader,
} from "./routes/contact";
import { action as destroyAction } from "./routes/destroy";
import Edit, { action as editAction } from "./routes/edit";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./routes/root";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataBrowserRouter>
      <Route
        path="/"
        element={<Root />}
        errorElement={<ErrorPage />}
        loader={rootLoader}
      >
        <Route errorElement={<ErrorPage />} action={rootAction}>
          <Route index element={<Index />} />
          <Route
            path="contacts/:contactId"
            element={<Contact />}
            loader={contactLoader}
            action={contactAction}
          />
          <Route
            path="contacts/:contactId/edit"
            element={<Edit />}
            loader={contactLoader}
            action={editAction}
          />
          <Route path="contacts/:contactId/destroy" action={destroyAction} />
        </Route>
      </Route>
    </DataBrowserRouter>
  </React.StrictMode>
);
