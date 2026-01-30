import Link from "next/link";
import { supabase } from "../../../utils/supabase";
import DamageCalculator from "../../../components/DamageCalculator";

export default async function MonsterDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Supabase에서 데이터 가져오기
  const { data: monsterData, error } = await supabase
    .from("monsters")
    .select("*")
    .eq("id", id)
    .single();

  // ⭐️ [해결의 열쇠] "이 데이터는 뭐든지 될 수 있다(any)"라고 선언해서 에러 무시하기
  const monster = monsterData as any;

  if (error || !monster) {
    return (
      <div className="p-10 text-center text-xl">
        <p>😢 몬스터 정보를 찾을 수 없습니다.</p>
        <Link href="/" className="text-blue-500 hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen text-black bg-white">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← 뒤로가기
      </Link>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg h-96">
             {/* 이미지 안전장치 추가 */}
             <img 
               src={monster.image || "/mob1.jpg"} 
               alt={monster.name} 
               className="object-cover w-full h-full"
             />
        </div>

        <div>
          <h1 className="text-5xl font-bold mb-4 text-red-600">{monster.name}</h1>
          
          <div className="space-y-4 text-xl text-gray-700 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p>❤️ <strong>체력:</strong> {monster.hp}</p>
            <p>📍 <strong>출몰 위치:</strong> {monster.location}</p>
            <p>💰 <strong>주요 드랍:</strong> {monster.drop}</p>
          </div>

          <div className="mt-8">
            {/* ⭐️ [핵심 수정] String(...)으로 한 번 감싸서 무조건 문자로 만듦 */}
            <DamageCalculator hp={parseInt(String(monster.hp).replace(/,/g, ""))} />
          </div>
        </div>
      </div>
    </div>
  );
}