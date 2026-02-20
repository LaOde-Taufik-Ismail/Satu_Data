import React from "react";
import { Routes, Route } from "react-router-dom";

// IMPORT KOMPONEN
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // <--- JANGAN LUPA INI

// IMPORT HALAMAN
import Home from "./pages/Home";
import ListInstansi from "./pages/ListInstansi";
import KatalogData from "./pages/KatalogData"; // Pastikan file ini ada
import Infografis from "./pages/Infografis";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/infografis" element={<Infografis />} />
          <Route path="/produsen/:kategori" element={<ListInstansi />} />
          <Route path="/instansi/:instansiId" element={<KatalogData />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
