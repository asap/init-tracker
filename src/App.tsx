import React from "react";
import { createRoot, Root } from "react-dom/client";
import InitativeTable from "./components/InitiativeTable";

const App = () => {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-macondo">Roll Initiative!</h1>
      <p className="text-lg font-cormorantGaramond">
        This is a work in progress
      </p>

      <InitativeTable />
    </div>
  );
};

const container: HTMLElement = document.getElementById("root")!;
const root: Root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
