import React from "react";
import { Database, Mail, MapPin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-6 mt-auto border-t-4 border-wakatobi-coral">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-wakatobi-coral p-2 rounded-xl">
                <Database size={24} />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter">
                Satu Data Wakatobi
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Portal resmi berbagi data terbuka Pemerintah Kabupaten Wakatobi
              guna mewujudkan transparansi dan akuntabilitas informasi publik.
            </p>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-6">
            <h5 className="font-bold text-wakatobi-coral uppercase tracking-widest text-xs">
              Kontak Kami
            </h5>
            <ul className="flex flex-col gap-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-wakatobi-light shrink-0" />
                <span>
                  Kompleks Perkantoran Motika, Wangi-Wangi Selatan, Kabupaten
                  Wakatobi, Sulawesi Tenggara
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-wakatobi-light shrink-0" />
                <span>kominfo@wakatobikab.go.id</span>
              </li>
            </ul>
          </div>

          {/* Institutional Column */}
          <div className="flex flex-col gap-6">
            <h5 className="font-bold text-wakatobi-coral uppercase tracking-widest text-xs">
              Unit Pengelola
            </h5>
            <div className="text-sm text-slate-300 leading-relaxed">
              <p className="font-bold text-white mb-1">
                Dinas Komunikasi Informatika Statistik dan Persandian
              </p>
              <p>Bidang Statistik & Persandian</p>
              <div className="mt-4 flex gap-4">
                <a
                  href="https://wakatobikab.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition"
                  aria-label="Official Website of Wakatobi Regency"
                >
                  <Globe size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-xs font-medium uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Pemerintah Kabupaten Wakatobi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
