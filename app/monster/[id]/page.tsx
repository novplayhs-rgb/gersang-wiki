import Link from "next/link";
import { supabase } from "../../../utils/supabase";
import DamageCalculator from "../../../components/DamageCalculator";

export default async function MonsterDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: monster, error } = await supabase
    .from("monsters")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !monster) {
    return <div className="p-10 text-center">정보를 찾을 수 없습니다.</div>;
  }

  const locationList = monster.locations ? monster.locations.split(",") : [];
  const dropList = monster.drops ? monster.drops.split(",") : [];

  return (
    <div className="min-h-screen bg-gray-50 text-black pb-20">
      <div className="max-w-5xl mx-auto p-6">
        <Link href="/" className="text-blue-600 font-bold hover:underline">
          &larr; 메인으로 돌아가기
        </Link>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex gap-2 mb-2">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                {monster.move_type}
              </span>
              <span className="bg-red-600 px-3 py-1 rounded-full text-xs font-bold">
                {monster.attribute}속성 ({monster.attr_value})
              </span>
              {/* 보스 표시 */}
              {monster.is_boss && (
                 <span className="bg-purple-600 px-3 py-1 rounded-full text-xs font-bold border border-purple-400">
                   👹 BOSS
                 </span>
              )}
            </div>
            <h1 className="text-4xl font-bold">{monster.name}</h1>
          </div>
          <div className="text-right bg-white/10 p-4 rounded-lg">
             <p className="text-gray-300 text-xs uppercase tracking-wider">Experience</p>
             <p className="text-2xl font-mono text-yellow-400">{monster.exp.toLocaleString()} EXP</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* 왼쪽: 이미지 영역 수정 */}
          <div className="col-span-1 bg-gray-100 p-8 border-r border-gray-200">
            <div className="aspect-square bg-white rounded-xl shadow-inner flex items-center justify-center mb-6 p-4 overflow-hidden">
              {monster.image ? (
                <img 
                  src={monster.image} 
                  alt={monster.name} 
                  className="max-h-full object-contain"
                />
              ) : (
                <div className="text-gray-400 font-bold text-lg">이미지 없음</div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 font-bold mb-1">HP (체력)</p>
                <p className="text-2xl font-bold text-gray-800">{monster.hp.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 font-bold mb-1">MP (마력)</p>
                <p className="text-2xl font-bold text-blue-600">{monster.mp.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              📊 전투 정보
            </h2>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-10">
              <div>
                <span className="block text-sm text-gray-500 mb-1">타격 저항</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.min(monster.res_strike, 100)}%` }}></div>
                </div>
                <span className="font-bold text-lg">{monster.res_strike}%</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">마법 저항</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${Math.min(monster.res_magic, 100)}%` }}></div>
                </div>
                <span className="font-bold text-lg">{monster.res_magic}%</span>
              </div>
              
              <div className="col-span-2 border-t pt-4 mt-2">
                <span className="block text-sm text-gray-500 mb-1">공격력</span>
                <span className="text-2xl font-bold text-red-600">
                  {monster.atk_min.toLocaleString()} ~ {monster.atk_max.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {/* 뇌전주 & 디버프 정보 */}
              <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <p className="font-bold text-yellow-800 mb-1 text-sm">⚡️ 뇌전주</p>
                    <p className="text-lg font-bold">
                        {monster.thunder_bolt === 'O' ? '걸림 (O)' : 
                         monster.thunder_bolt === 'X' ? '안 걸림 (X)' : '미확인 (?)'}
                    </p>
                  </div>
                  
                  {(monster.debuff1 || monster.debuff2) && (
                    <div className="flex-[2] p-4 bg-gray-100 rounded-lg border-l-4 border-purple-500">
                      <p className="font-bold text-purple-700 mb-1 text-sm">⚠️ 디버프</p>
                      <p className="text-gray-700">{monster.debuff1} {monster.debuff2 && `, ${monster.debuff2}`}</p>
                    </div>
                  )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">📍 출몰 지역</h3>
                <div className="flex flex-wrap gap-2">
                  {locationList.map((loc: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                      {loc.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">💰 드랍 아이템</h3>
                <div className="flex flex-wrap gap-2">
                  {dropList.map((item: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-yellow-50 text-yellow-900 border border-yellow-200 rounded-lg text-sm font-bold shadow-sm">
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t">
               <DamageCalculator hp={monster.hp} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}