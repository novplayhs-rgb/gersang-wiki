"use client";

import { useState } from "react";

// ⭐️ 여기서 "숫자 hp를 받겠다"고 약속합니다
interface Props {
  hp: number;
}

export default function DamageCalculator({ hp }: Props) {
  // 사용자가 입력할 스킬 데미지
  const [skillDamage, setSkillDamage] = useState(0);

  // 몇 방인지 계산 (체력이 0이면 0방)
  // Math.ceil: 소수점 올림 (예: 2.1방 -> 3방)
  const hitsNeeded = skillDamage > 0 ? Math.ceil(hp / skillDamage) : 0;

  return (
    <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
      <h3 className="text-2xl font-bold text-blue-800 mb-4">⚔️ 킬각 계산기</h3>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            내 스킬 데미지
          </label>
          <input
            type="number"
            value={skillDamage || ""}
            onChange={(e) => setSkillDamage(Number(e.target.value))}
            placeholder="예: 25000"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="text-center px-4">
          <span className="text-3xl">👉</span>
        </div>

        <div className="flex-1 w-full bg-white p-4 rounded-lg border border-gray-300 text-center">
          <span className="block text-sm text-gray-500">필요한 타격 횟수</span>
          <strong className="text-3xl text-red-600 font-black">
            {hitsNeeded > 0 ? `${hitsNeeded}방` : "데미지를 입력하세요"}
          </strong>
        </div>
      </div>
    </div>
  );
}