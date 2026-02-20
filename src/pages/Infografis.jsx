import React from "react";
import { portalData } from "../data/portalData";
import DataCard from "../components/DataCard";
import { BarChart3, Info } from "lucide-react";

const Infografis = () => {
  // Memfilter hanya data yang memiliki tipe 'infografis'
  const visualData = portalData.filter((item) => item.tipe === "infografis");

  return (
    <main className="container mx-auto py-20 px-6 min-h-screen">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-4">
            <BarChart3 className="text-wakatobi-coral" size={36} />
            Galeri Infografis
          </h2>
          <div className="h-2 w-24 bg-wakatobi-coral rounded-full mt-3"></div>
          <p className="text-slate-500 mt-6 leading-relaxed">
            Kumpulan visualisasi data statistik sektoral Kabupaten Wakatobi
            dalam bentuk grafik dan diagram yang informatif.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4 max-w-sm">
          <Info className="text-wakatobi-blue shrink-0" size={24} />
          <p className="text-xs text-wakatobi-blue leading-relaxed font-medium">
            Infografis ini dirancang untuk memudahkan masyarakat dalam memahami
            capaian pembangunan daerah secara cepat dan akurat.
          </p>
        </div>
      </div>

      {/* Grid Tampilan */}
      {visualData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visualData.map((data) => (
            <DataCard key={data.id} data={data} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-100 rounded-[3rem] border-2 border-dashed border-slate-200">
          <BarChart3 className="mx-auto text-slate-300 mb-4" size={48} />
          <h4 className="text-slate-400 font-bold uppercase tracking-widest">
            Belum ada data infografis tersedia
          </h4>
        </div>
      )}
    </main>
  );
};

export default Infografis;
