"use client"; // ⭐️ 중요: 이 파일은 사용자와 상호작용(클릭, 입력) 한다고 선언!

import { useState } from "react";

export default function DamageCalculator({ hp }: { hp: string }) {
  // 1. 내 공격력을 저장하는 통 (기본값 0)
  const [myDamage, setMyDamage] = useState(0);

  // 2. 몬스터 체력 문자열("120,000")을 진짜 숫자(120000)로 바꾸기
  // 쉼표(,)를 없애고 숫자로 변환합니다.
  const monsterHp = Number(hp.replaceAll(",", ""));

  // 3. 몇 방 때려야 죽는지 계산
  // 공격력이 0이면 0방, 아니면 체력 나누기 공격력 (올림 처리)
  const hitCount = myDamage > 0 ? Math.ceil(monsterHp / myDamage) : 0;

  return (
    <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-yellow-800">🧮 몇 방 컷 계산기</h3>
      
      <div className="flex items-center gap-4">
        <label className="font-bold">내 스킬 데미지:</label>
        <input
          type="number"
          placeholder="데미지 입력"
          className="border p-2 rounded w-40"
          // 값이 바뀔 때마다(onChange) 내 공격력 통(setMyDamage)에 저장
          onChange={(e) => setMyDamage(Number(e.target.value))}
        />
      </div>

      <div className="mt-4 p-4 bg-white rounded shadow text-lg">
        {myDamage > 0 ? (
          <p>
            이 몬스터는 <span className="text-red-600 font-bold">{hitCount}방</span> 때리면 죽습니다!
          </p>
        ) : (
          <p className="text-gray-400">데미지를 입력해보세요.</p>
        )}
      </div>
    </div>
  );
}