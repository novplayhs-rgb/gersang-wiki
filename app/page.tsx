"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../utils/supabase";

type Monster = {
  id: number;
  name: string;
  image: string;
  attribute: string;
  move_type: string;
  hp: number;
  mp: number;
  res_strike: number;
  res_magic: number;
  locations: string; 
  drops: string;
};

export default function Home() {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMonsters = async () => {
      const { data, error } = await supabase.from("monsters").select("*");
      if (!error) setMonsters(data || []);
    };
    fetchMonsters();
  }, []);

  const filteredMonsters = monsters.filter((mob) =>
    mob.name.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-50 text-black">
      <header className="bg-blue-900 text-white py-12 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">천하제일 거상 위키</h1>
        <p className="text-xl text-blue-200">
          모든 거상 정보를 한곳에. 몬스터, 아이템, 사냥터 DB
        </p>
      </header>

      <main className="max-w-6xl mx-auto p-6 -mt-8">
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex gap-4">
          <input
            type="text"
            placeholder="몬스터 이름을 검색해보세요 (예: 청랑)"
            className="flex-1 p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredMonsters.map((mob) => (
            <Link 
              href={`/monster/${mob.id}`} 
              key={mob.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition hover:-translate-y-1 group"
            >
              {/* 이미지 영역 수정: 이미지가 없으면 회색 박스 표시 */}
              <div className="h-48 bg-gray-200 overflow-hidden relative">
                {mob.image ? (
                  <img 
                    src={mob.image} 
                    alt={mob.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-bold">
                    이미지 없음
                  </div>
                )}
                
                <span className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                  {mob.move_type}
                </span>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">{mob.name}</h2>
                  <span className="text-sm font-bold text-red-500 border border-red-200 px-2 py-0.5 rounded">
                    {mob.attribute}속성
                  </span>
                </div>
                
                <div className="text-gray-600 text-sm space-y-1">
                  <p>❤️ 체력: {mob.hp.toLocaleString()}</p>
                  <p>📍 사냥터: {mob.locations.split(",")[0]}...</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}