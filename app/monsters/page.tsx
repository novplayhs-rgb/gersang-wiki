"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../utils/supabase";

// 몬스터 타입 정의
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

export default function MonsterList() {
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
    <div className="min-h-screen bg-slate-50 text-black p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* 상단 헤더 & 뒤로가기 */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-blue-600 font-bold hover:underline text-lg">
            &larr; 대문으로 돌아가기
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-800">
            🐲 몬스터 도감
          </h1>
        </div>

        {/* 검색창 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <input
            type="text"
            placeholder="몬스터 이름을 검색해보세요 (예: 청랑)"
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500 transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 몬스터 목록 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredMonsters.map((mob) => (
            <Link 
              href={`/monster/${mob.id}`} 
              key={mob.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition hover:-translate-y-1 group border border-gray-100"
            >
              {/* 이미지 영역 */}
              <div className="h-48 bg-gray-200 overflow-hidden relative flex items-center justify-center">
                {mob.image ? (
                  <img 
                    src={mob.image} 
                    alt={mob.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="text-gray-400 font-bold">이미지 없음</div>
                )}
                
                <span className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                  {mob.move_type}
                </span>
              </div>

              {/* 정보 영역 */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">{mob.name}</h2>
                  <span className={`text-sm font-bold border px-2 py-0.5 rounded
                    ${mob.attribute === '화' ? 'text-red-500 border-red-200 bg-red-50' : 
                      mob.attribute === '수' ? 'text-blue-500 border-blue-200 bg-blue-50' :
                      mob.attribute === '뇌' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' :
                      mob.attribute === '풍' ? 'text-green-500 border-green-200 bg-green-50' :
                      mob.attribute === '지' ? 'text-stone-500 border-stone-200 bg-stone-50' :
                      'text-gray-500 border-gray-200 bg-gray-50'
                    }`}>
                    {mob.attribute}속성
                  </span>
                </div>
                
                <div className="text-gray-600 text-sm space-y-1">
                  <p>❤️ 체력: {mob.hp.toLocaleString()}</p>
                  <p className="truncate">📍 {mob.locations.split(",")[0] || "위치 정보 없음"}...</p>
                </div>
              </div>
            </Link>
          ))}
          
          {/* 검색 결과 없을 때 */}
          {filteredMonsters.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400">
              <p className="text-xl">검색 결과가 없습니다 😢</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}