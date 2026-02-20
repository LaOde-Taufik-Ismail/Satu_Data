import React from "react";
import { useParams, Link } from "react-router-dom";
import { portalData, instansiList } from "../data/portalData";
import DataCard from "../components/DataCard";
import { Users, Database, BarChart3, ArrowLeft } from "lucide-react";

const KatalogData = () => {
  const { instansiId } = useParams();

  // Mencari nama instansi dari semua kategori
  const allInstansi = Object.values(instansiList).flat();
  const instansi = allInstansi.find((i) => i.id === instansiId);

  // Find category for breadcrumb
  let kategoriInstansi = null;
  if (instansi) {
    for (const kategori in instansiList) {
      if (instansiList[kategori].some((i) => i.id === instansiId)) {
        kategoriInstansi = kategori;
        break;
      }
    }
  }

  if (!instansi) {
    return (
      <main className="container mx-auto py-24 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <Users size={64} className="text-slate-300 mb-6" />
        <h3 className="text-2xl font-bold text-slate-700">
          Instansi Tidak Ditemukan
        </h3>
        <p className="text-slate-500 mt-2 max-w-md">
          Maaf, kami tidak dapat menemukan instansi dengan ID "{instansiId}".
          Silakan periksa kembali URL Anda.
        </p>
        <Link
          to="/"
          className="mt-8 bg-wakatobi-blue hover:bg-wakatobi-coral text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Kembali ke Beranda
        </Link>
      </main>
    );
  }

  const filteredData = portalData.filter((d) => d.produsenId === instansiId);
  const infographicCount = filteredData.filter(
    (d) => d.tipe === "infografis",
  ).length;

  return (
    <main className="container mx-auto py-20 px-6 min-h-screen">
      <div className="mb-12 text-center">
        <div className="inline-block bg-white p-4 rounded-3xl shadow-md mb-6 border border-slate-100">
          <Users size={48} className="text-wakatobi-blue" />
        </div>
        <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tight">
          {instansi.nama}
        </h2>
        <p className="text-slate-500 mt-2 font-medium max-w-2xl mx-auto">
          Kumpulan dataset yang diproduksi dan dipublikasikan secara resmi oleh{" "}
          {instansi.nama}.
        </p>

        <div className="mt-6 flex items-center justify-center gap-x-8 gap-y-4 flex-wrap text-slate-600">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-wakatobi-blue" />
            <span className="font-bold">{filteredData.length}</span> Total
            Dataset
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-wakatobi-coral" />
            <span className="font-bold">{infographicCount}</span> Infografis
          </div>
        </div>

        {kategoriInstansi && (
          <div className="mt-8">
            <Link
              to={`/produsen/${kategoriInstansi}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-wakatobi-blue hover:text-wakatobi-coral transition-colors"
            >
              <ArrowLeft size={16} />
              Kembali ke Daftar Instansi {kategoriInstansi}
            </Link>
          </div>
        )}
      </div>

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((data) => (
            <DataCard key={data.id} data={data} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <Database className="mx-auto text-slate-300 mb-4" size={40} />
          <h4 className="text-slate-600 font-bold text-lg">
            Belum Ada Dataset
          </h4>
          <p className="text-slate-500 mt-1">
            Instansi ini belum mempublikasikan dataset apapun.
          </p>
        </div>
      )}
    </main>
  );
};

export default KatalogData;
