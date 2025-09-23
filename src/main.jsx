import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import EventsPage from "./components/pages/EventsPage.jsx";
import AgendaPage from "./components/pages/AgendaPage.jsx";
import PastEdPage from "./components/pages/PastEdPage.jsx";
import ScrollToTop from "./components/blocks/ScrollToTop.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/key-events" element={<EventsPage />} />
      <Route path="/agenda" element={<AgendaPage />} />
      <Route path="/past-editions" element={<PastEdPage />} />
    </Routes>
  </BrowserRouter>
);
