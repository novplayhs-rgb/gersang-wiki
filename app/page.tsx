"use client";

import { useState, useEffect } from "react"; // useEffect 추가됨!
import Link from "next/link";
import { supabase } from "../utils/supabase"; // ⭐️ 우리가 만든 연결 도구 가져오기

// 1. 몬스터 데이터 타입 정의 (TypeScript가 좋아합니다)
type Monster = {
  id: number;
  name: string;
  hp: string;
  location: string;
  drop: string;
  image: string;
};

export default function Home() {
  // 2. 몬스터 데이터를 담을 빈 통 (처음엔 비어있음 [])
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 3. [데이터 가져오기 핵심] 페이지가 열리면 Supabase에 다녀옴
  useEffect(() => {
    const fetchMonsters = async () => {
      // 'monsters' 테이블에서 모든 것('*')을 가져와라!
      const { data, error } = await supabase.from("monsters").select("*");

      if (error) {
        console.error("데이터 가져오기 실패:", error);
      } else {
        // 성공하면 가져온 데이터를 내 통(monsters)에 채워넣음
        setMonsters(data || []);
      }
    };

    fetchMonsters(); // 실행!
  }, []);

  // 4. 검색 필터링 (내 통에 있는 데이터로 검색)
  const filteredMonsters = monsters.filter((mob) =>
    mob.name.includes(searchTerm)
  );

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <h1 className="text-5xl font-bold text-blue-700">천하제일 거상 위키</h1>
      <p className="mt-4 text-xl text-gray-600 mb-8">
        Supabase DB와 연동된 실시간 데이터베이스입니다.
      </p>

      {/* 검색창 */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="몬스터 이름을 검색하세요..."
          className="w-full max-w-md p-4 border-2 border-blue-500 rounded-lg text-lg outline-none focus:bg-blue-50"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <p className="mb-4 text-gray-500">
        데이터 출처: Supabase Cloud / 검색 결과: {filteredMonsters.length}마리
      </p>

      {/* 목록 보여주기 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMonsters.map((mob) => (
          <Link 
            href={`/monster/${mob.id}`} 
            key={mob.id} 
            className="border-2 border-gray-300 p-6 rounded-lg hover:bg-blue-50 transition shadow-lg block"
          >
            <div className="relative w-full h-48 mb-4 bg-gray-200 rounded-md overflow-hidden">
               {/* 이미지가 없으면 기본 이미지 보여주기 (에러 방지) */}
               <img 
                 src={mob.image || "/mob1.jpg"} 
                 alt={mob.name} 
                 className="object-cover w-full h-full"
               />
            </div>

            <h2 className="text-3xl font-bold mb-2 text-red-600">{mob.name}</h2>
            <div className="text-gray-700 space-y-1">
              <p>❤️ 체력: {mob.hp}</p>
              <p>📍 위치: {mob.location}</p>
              <p>💰 대표 드랍: <span className="font-bold text-blue-600">{mob.drop}</span></p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}