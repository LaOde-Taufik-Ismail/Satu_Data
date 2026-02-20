import React from "react";
import { useParams, Link } from "react-router-dom";
import { instansiList, portalData } from "../data/portalData";
import { Users, Database } from "lucide-react";

const ListInstansi = () => {
  const { kategori } = useParams();
  const daftar = instansiList[kategori] || [];
  if (daftar.length === 0) {
    return (
      <main className="container mx-auto py-24 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <Users size={64} className="text-slate-300 mb-6" />
        <h3 className="text-2xl font-bold text-slate-700">
          Kategori Tidak Ditemukan
        </h3>
        <p className="text-slate-500 mt-2 max-w-md">
          Maaf, kami tidak dapat menemukan daftar instansi untuk kategori "
          {kategori}". Silakan periksa kembali URL Anda.
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

  return (
    <main className="container mx-auto py-20 px-6 min-h-screen">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tight">
          Produsen Data: {kategori}
        </h2>
        <p className="text-slate-500 mt-2 font-medium">
          Pilih salah satu instansi untuk melihat dataset yang tersedia.
        </p>
        <div className="h-1.5 w-24 bg-wakatobi-coral rounded-full mt-4 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {daftar.map((item) => {
          const datasetCount = portalData.filter(
            (d) => d.produsenId === item.id,
          ).length;
          return (
            <Link
              to={`/instansi/${item.id}`}
              key={item.id}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-wakatobi-blue/50 hover:-translate-y-1 transition-all group flex flex-col text-center h-full"
            >
              <div className="flex-grow">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl mx-auto mb-5 flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                  <Users
                    size={36}
                    className="text-wakatobi-blue opacity-50 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h4 className="font-extrabold text-slate-800 uppercase text-sm leading-tight group-hover:text-wakatobi-blue transition-colors">
                  {item.nama}
                </h4>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
                <Database size={14} />
                <span className="font-bold text-xs uppercase tracking-wider">
                  {datasetCount} Dataset
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default ListInstansi;
