import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Database,
  Users,
  Image as IconImage,
  Home as IconHome,
  Menu,
  X,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { produsenCategories } from "../data/portalData";

const Navbar = () => {
  // State untuk Desktop & Mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProdusenOpen, setIsProdusenOpen] = useState(false); // Desktop Dropdown
  const [isProdusenAccordionOpen, setIsProdusenAccordionOpen] = useState(false); // Mobile Accordion

  // Fungsi reset menu saat link diklik
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProdusenOpen(false);
    setIsProdusenAccordionOpen(false);
  };

  return (
    <nav className="nav-glass text-white sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* 1. LOGO BRANDING */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group"
          >
            <div className="bg-gradient-to-br from-wakatobi-coral to-orange-400 p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
              <Database size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight leading-none uppercase">
                Satu Data
              </span>
              <span className="text-[10px] tracking-[0.2em] text-wakatobi-light font-medium uppercase">
                Wakatobi
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP MENU (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              onClick={closeMenu}
              className="menu-link flex items-center gap-2 text-sm font-semibold hover:text-wakatobi-coral transition"
            >
              <IconHome size={18} /> HOME
            </Link>

            {/* Dropdown Desktop */}
            <div
              className="relative"
              onMouseEnter={() => setIsProdusenOpen(true)}
              onMouseLeave={() => setIsProdusenOpen(false)}
            >
              <button className="menu-link flex items-center gap-2 text-sm font-semibold hover:text-wakatobi-coral transition uppercase">
                <Users size={18} /> PRODUSEN{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isProdusenOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Panel Dropdown */}
              <div
                className={`absolute top-full left-0 mt-0 w-56 bg-white rounded-xl shadow-2xl py-2 z-[60] border border-slate-100 transition-all duration-200 ${isProdusenOpen ? "opacity-100 visible translate-y-2" : "opacity-0 invisible translate-y-0"}`}
              >
                {produsenCategories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/produsen/${cat}`}
                    onClick={closeMenu}
                    className="block px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-wakatobi-blue text-sm font-medium border-b border-slate-50 last:border-0"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/infografis"
              onClick={closeMenu}
              className="menu-link flex items-center gap-2 text-sm font-semibold hover:text-wakatobi-coral transition"
            >
              <IconImage size={18} /> INFOGRAFIS
            </Link>

            <div className="h-6 w-[1px] bg-white/20 mx-2"></div>

            {/* <button className="flex items-center gap-2 bg-white/10 hover:bg-wakatobi-coral border border-white/20 px-5 py-2 rounded-full text-sm font-bold backdrop-blur-md transition-all active:scale-95">
              <LogIn size={16} /> MASUK
            </button> */}
          </div>

          {/* 3. MOBILE TOGGLE BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE MENU OVERLAY (Ini yang kemarin hilang) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-wakatobi-blue/95 backdrop-blur-2xl border-t border-white/10 ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 py-8 flex flex-col gap-4 h-screen overflow-y-auto pb-32">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-4 text-lg font-medium p-3 text-white/90 hover:bg-white/10 rounded-xl"
          >
            <IconHome size={20} /> Home
          </Link>

          {/* Accordion Mobile untuk Produsen */}
          <div className="flex flex-col bg-white/5 rounded-xl overflow-hidden">
            <button
              onClick={() =>
                setIsProdusenAccordionOpen(!isProdusenAccordionOpen)
              }
              className="flex items-center justify-between p-4 text-lg font-medium text-white/90 hover:bg-white/5 w-full"
            >
              <div className="flex items-center gap-4">
                <Users size={20} /> Produsen
              </div>
              <ChevronDown
                className={`transition-transform duration-300 ${isProdusenAccordionOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Isi Accordion */}
            <div
              className={`transition-all duration-300 ease-in-out bg-black/20 ${isProdusenAccordionOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="grid grid-cols-1 gap-1 p-2">
                {produsenCategories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/produsen/${cat}`}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-6 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-wakatobi-coral rounded-full"></div>
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/infografis"
            onClick={closeMenu}
            className="flex items-center gap-4 text-lg font-medium p-3 text-white/90 hover:bg-white/10 rounded-xl"
          >
            <IconImage size={20} /> Infografis
          </Link>

          <hr className="border-white/10 my-4" />

          {/* <button className="w-full bg-wakatobi-coral hover:bg-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95">
            <LogIn size={20} /> MASUK KE PORTAL
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
