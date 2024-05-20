import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import StartRating from "./components/StarRating.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <StartRating />
    <StartRating
      message={["good", "great", "WOW"]}
      maxRating={3}
      size={60}
      defaultRating={1}
      color="pink"
    />
  </React.StrictMode>
);
