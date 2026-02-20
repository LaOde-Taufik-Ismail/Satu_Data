import React from "react";
import { Download, FileText, BarChart3, ExternalLink } from "lucide-react";

const DataCard = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail Section */}
      <div className="relative group">
        <img
          src={data.thumbnail}
          alt={data.judul}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
          <span className="text-[10px] font-black text-wakatobi-blue uppercase tracking-wider">
            {data.kategori}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          {data.tipe === "infografis" ? (
            <BarChart3 size={14} className="text-wakatobi-coral" />
          ) : (
            <FileText size={14} className="text-wakatobi-blue" />
          )}
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
            {data.produsen}
          </span>
        </div>

        <h4 className="text-xl font-extrabold text-slate-800 leading-tight mb-3 group-hover:text-wakatobi-blue transition-colors">
          {data.judul}
        </h4>

        <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
          {data.deskripsi}
        </p>

        {/* Action Button */}
        <a
          href={data.linkDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-wakatobi-blue text-white py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-slate-200"
        >
          <Download size={18} />
          UNDUH DATA (DRIVE)
          <ExternalLink size={14} className="opacity-50" />
        </a>
      </div>
    </div>
  );
};

export default DataCard;
