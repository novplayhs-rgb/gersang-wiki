import Link from "next/link";
import { supabase } from "../../../utils/supabase";
import DamageCalculator from "../../../components/DamageCalculator"; // 경로 확인 필요!

export default async function MonsterDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. URL주소에서 id 숫자 꺼내오기 (비동기 처리)
  const { id } = await params;

  // 2. Supabase한테 물어보기: "id가 이거인 놈 딱 1마리(.single)만 줘"
  const { data: monster, error } = await supabase
    .from("monsters")
    .select("*")
    .eq("id", id)
    .single();

  // 3. 몬스터가 없거나 에러가 나면?
  if (error || !monster) {
    return (
      <div className="p-10 text-center text-xl">
        <p>😢 몬스터 정보를 찾을 수 없습니다.</p>
        <Link href="/" className="text-blue-500 hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  // 4. 있으면 화면에 그리기
  return (
    <div className="p-10 min-h-screen text-black bg-white">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← 뒤로가기
      </Link>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 왼쪽: 이미지 */}
        <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg h-96">
             <img 
               src={monster.image || "/mob1.jpg"} 
               alt={monster.name} 
               className="object-cover w-full h-full"
             />
        </div>

        {/* 오른쪽: 정보 */}
        <div>
          <h1 className="text-5xl font-bold mb-4 text-red-600">{monster.name}</h1>
          
          <div className="space-y-4 text-xl text-gray-700 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p>❤️ <strong>체력:</strong> {monster.hp}</p>
            <p>📍 <strong>출몰 위치:</strong> {monster.location}</p>
            <p>💰 <strong>주요 드랍:</strong> {monster.drop}</p>
          </div>

          {/* 계산기 컴포넌트 (이전 시간에 만든 것) */}
          <div className="mt-8">
            <DamageCalculator hp={parseInt(monster.hp.replace(/,/g, ""))} />
          </div>
        </div>
      </div>
    </div>
  );
}