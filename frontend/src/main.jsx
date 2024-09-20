import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/User.jsx";
import { PodcastProvider } from "./context/Podcast.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <PodcastProvider>
      <App />
      </PodcastProvider>
    </UserProvider>
  </StrictMode>
);
