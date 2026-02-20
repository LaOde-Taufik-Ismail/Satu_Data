import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  BarChart3,
  FileText,
  Users,
  ArrowRight,
  ShieldCheck,
  Database,
  Zap,
} from "lucide-react";
import { portalData } from "../data/portalData";
import DataCard from "../components/DataCard";
import { Link } from "react-router-dom";
import heroImage from "../assets/Wakatobi-Dive.png";
import { instansiList } from "../data/portalData";

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const resultsRef = useRef(null);

  // Efek untuk auto-scroll ke hasil pencarian
  useEffect(() => {
    if (searchTerm) {
      const timer = setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // Delay untuk memastikan UI update sebelum scroll
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  // Logika Filter Data
  const filteredData = portalData.filter((item) => {
    const term = searchTerm.toLowerCase();
    const judul = item.judul ? item.judul.toLowerCase() : "";
    const produsenId = item.produsenId ? item.produsenId.toLowerCase() : "";
    const produsenNama = item.produsen ? item.produsen.toLowerCase() : "";
    return (
      judul.includes(term) ||
      produsenId.includes(term) ||
      produsenNama.includes(term)
    );
  });

  const displayedData = searchTerm
    ? filteredData
    : filteredData.slice(0, visibleCount);

  const totalProdusen = Object.values(instansiList).flat().length;
  const infographicCount = portalData.filter(
    (item) => item.tipe === "infografis",
  ).length;
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. HERO SECTION (Tampilan Utama) */}
      <header className="relative bg-wakatobi-blue pt-32 pb-48 md:pb-52 px-6 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Wakatobi Underwater"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-wakatobi-blue/90 to-wakatobi-blue/60"></div>
        </div>

        {/* Konten Hero (Teks & Search) */}
        <div className="relative z-20 text-center max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-4">
            Official Open Data Portal
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg tracking-tight">
            PORTAL SATU DATA <br />{" "}
            <span className="text-blue-200">WAKATOBI</span>
          </h1>

          <p className="text-lg text-blue-50 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Akses satu pintu data pembangunan daerah yang akurat, mutakhir, dan
            terpadu untuk pengambilan kebijakan yang tepat sasaran.
          </p>

          <a
            href="#search-section"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#search-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-wakatobi-coral hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
          >
            Jelajahi Data
          </a>
        </div>

        {/* Hiasan Gelombang (Wave) - Diperbaiki posisinya */}
        <div className="absolute -bottom-1 left-0 w-full z-10 leading-none">
          <svg
            className="w-full h-16 md:h-32"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#f8fafc"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>

      {/* 2. STATISTIK (Floating Cards) */}
      <section className="relative z-30 px-6 -mt-16 md:-mt-20">
        <div className="container mx-auto">
          {/* Gunakan FadeIn wrapper */}
          <FadeIn className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={<FileText size={28} />}
              count={portalData.length}
              label="Dataset Tersedia"
            />
            <StatCard
              icon={<Users size={28} />}
              count={totalProdusen}
              label="Produsen Data"
            />
            <StatCard
              icon={<BarChart3 size={28} />}
              count={infographicCount}
              label="Infografis Publik"
            />
          </FadeIn>
        </div>
      </section>

      {/* 2.5. SEARCH SECTION */}
      <section id="search-section" className="py-20 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-6">
          <FadeIn delay={200}>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-black text-slate-800 mb-3">
                Jelajahi Katalog Data
              </h2>
              <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                Gunakan kata kunci untuk menemukan dataset yang relevan dengan
                kebutuhan Anda.
              </p>
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Cari data (contoh: Pariwisata, Kemiskinan...)"
                  className="w-full p-5 pl-14 rounded-full text-slate-800 shadow-lg border border-slate-200 outline-none bg-white focus:ring-4 focus:ring-wakatobi-blue/30 transition-all placeholder:text-slate-400 text-lg"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                <img src="" alt="" />
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={24}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. TENTANG PORTAL (Hanya tampil jika tidak ada pencarian) */}
      {!searchTerm && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="flex flex-col md:flex-row items-center gap-12 bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
                {/* Teks */}
                <div className="flex-1 order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-wakatobi-blue text-xs font-bold uppercase tracking-wider mb-6">
                    <Database size={14} />
                    Tentang Portal
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mb-4">
                    Transparansi &{" "}
                    <span className="text-wakatobi-coral">Akuntabilitas</span>
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    <strong>Portal Satu Data Kabupaten Wakatobi</strong>{" "}
                    dikelola resmi oleh Dinas Komunikasi, Informatika, Statistik
                    dan Persandian. Kami menjamin validitas data untuk mendukung
                    Wakatobi sebagai Kabupaten Cerdas (Smart City).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FeatureItem
                      icon={<ShieldCheck className="text-wakatobi-blue" />}
                      title="Data Valid"
                    />
                  </div>
                </div>

                {/* Gambar */}
                <div className="flex-1 order-1 md:order-2 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                    alt="Analisis Data"
                    className="rounded-3xl shadow-xl w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* 4. DATA GRID (Katalog & Hasil Pencarian) */}
      <main
        ref={resultsRef}
        id="katalog-data"
        className="container mx-auto pt-0 pb-20 px-6"
      >
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 uppercase">
                {searchTerm ? `Cari: "${searchTerm}"` : "Data Terbaru"}
              </h3>
              <div className="h-1.5 w-16 bg-wakatobi-coral rounded-full mt-2"></div>
            </div>

            {!searchTerm && (
              <Link
                to="/produsen/Dinas"
                className="flex items-center gap-2 text-wakatobi-blue font-bold hover:text-wakatobi-coral transition text-sm"
              >
                Lihat Semua <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {/* Grid Kartu Data */}
          {displayedData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedData.map((data) => (
                <DataCard key={data.id} data={data} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
              <Search className="mx-auto text-slate-300 mb-4" size={40} />
              <p className="text-slate-500 font-medium">
                Data tidak ditemukan.
              </p>
            </div>
          )}

          {!searchTerm && visibleCount < filteredData.length && (
            <div className="text-center mt-12">
              <button
                onClick={handleShowMore}
                className="bg-wakatobi-blue hover:bg-wakatobi-coral text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                Tampilkan Lebih Banyak
              </button>
            </div>
          )}
        </FadeIn>
      </main>
    </div>
  );
};

// --- KOMPONEN KECIL ---

const StatCard = ({ icon, count, label }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
    <div className="bg-blue-50 text-wakatobi-blue p-3 rounded-xl shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-2xl font-black text-slate-800">{count}</h4>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">
        {label}
      </p>
    </div>
  </div>
);

const FeatureItem = ({ icon, title }) => (
  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
    {icon}
    <span className="font-bold text-slate-700 text-sm">{title}</span>
  </div>
);

export default Home;
