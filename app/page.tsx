"use client"; // 1. 이제 이 페이지는 사용자의 입력을 받습니다!

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  // 몬스터 데이터 (나중엔 DB에서 가져옴)
  const monsters = [
    { id: 1, name: "청랑", hp: "120,000", location: "검은상단 주둔지", drop: "낡은태부", image: "/mob1.jpg" },
    { id: 2, name: "광호", hp: "80,000", location: "무령왕릉", drop: "검은수정", image: "/mob2.jpg" },
    { id: 3, name: "홍작", hp: "500,000", location: "화구산", drop: "주작의근원", image: "/mob3.jpg" },
    { id: 4, name: "기문교주", hp: "600,000", location: "대관령", drop: "기문교주의지팡이", image: "/mob4.jpg" },
  ];

  // 2. [검색 기능 핵심] 검색어를 저장할 공간(State) 만들기
  const [searchTerm, setSearchTerm] = useState("");

  // 3. [검색 기능 핵심] 검색어에 맞는 몬스터만 걸러내기(Filter)
  const filteredMonsters = monsters.filter((mob) =>
    // 몬스터 이름에 검색어가 포함되어 있니? (includes)
    mob.name.includes(searchTerm)
  );

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <h1 className="text-5xl font-bold text-blue-700">천하제일 거상 위키</h1>
      <p className="mt-4 text-xl text-gray-600 mb-8">
        여기는 내가 직접 만드는 거상 데이터베이스입니다.
      </p>

      {/* 4. 검색창 만들기 */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="몬스터 이름을 검색하세요..."
          className="w-full max-w-md p-4 border-2 border-blue-500 rounded-lg text-lg outline-none focus:bg-blue-50"
          // 입력할 때마다 그 값을 검색어 저장 공간(setSearchTerm)에 넣음
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <p className="mb-4 text-gray-500">
        검색 결과: {filteredMonsters.length}마리 발견
      </p>

      {/* 5. 이제 전체 목록(monsters)이 아니라, 걸러진 목록(filteredMonsters)을 보여줌 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMonsters.map((mob) => (
          <Link 
            href={`/monster/${mob.id}`} 
            key={mob.id} 
            className="border-2 border-gray-300 p-6 rounded-lg hover:bg-blue-50 transition shadow-lg block"
          >
            <div className="relative w-full h-48 mb-4 bg-gray-200 rounded-md overflow-hidden">
               <img 
                 src={mob.image} 
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