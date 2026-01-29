import DamageCalculator from "../../../components/DamageCalculator";

// app/monster/[id]/page.tsx

export default async function MonsterDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. URL에서 "이게 몇 번 몬스터야?"(id)를 알아냅니다.
  const { id } = await params;
  
  // 2. 전체 데이터 (임시 데이터베이스)
  // (실제 개발에선 이 부분이 진짜 DB 연결로 바뀝니다)
  const monsters = [
    { id: 1, name: "청랑", hp: "120,000", location: "검은상단 주둔지", drop: "낡은태부", image: "/mob1.jpg" },
    { id: 2, name: "광호", hp: "80,000", location: "무령왕릉", drop: "검은수정", image: "/mob2.jpg" },
    { id: 3, name: "홍작", hp: "500,000", location: "화구산", drop: "주작의근원", image: "/mob3.jpg" },
    { id: 4, name: "기문교주", hp: "600,000", location: "대관령", drop: "기문교주의지팡이", image: "/mob4.jpg" },
  ];

  // 3. ID에 맞는 몬스터 딱 한 마리만 찾아냅니다.
  const monster = monsters.find((m) => m.id === Number(id));

  // 만약 없는 번호(예: 99번)로 들어오면?
  if (!monster) {
    return <h1>몬스터를 찾을 수 없습니다.</h1>;
  }

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">{monster.name} 상세 정보</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
            {/* 왼쪽: 이미지 */}
            <div className="w-full md:w-1/2">
                <img src={monster.image} alt={monster.name} className="w-full rounded-lg shadow-xl" />
            </div>

            {/* 오른쪽: 스탯 정보 */}
            <div className="w-full md:w-1/2 text-lg space-y-4">
                <p className="border-b pb-2">❤️ <strong>체력:</strong> {monster.hp}</p>
                <p className="border-b pb-2">📍 <strong>출몰 지역:</strong> {monster.location}</p>
                <p className="border-b pb-2">💰 <strong>주요 드랍템:</strong> {monster.drop}</p>
                
{/* ... 위쪽 코드 생략 ... */}

<p className="border-b pb-2">💰 <strong>주요 드랍템:</strong> {monster.drop}</p>

{/* 👇 여기에 계산기 추가! (몬스터 체력을 부품에게 전달해줍니다) */}
<DamageCalculator hp={monster.hp} />

{/* 뒤로가기 버튼 */}
<a href="/" className="inline-block mt-8 ..."></a>

                {/* 뒤로가기 버튼 */}
                <a href="/" className="inline-block mt-8 px-6 py-3 bg-gray-200 rounded hover:bg-gray-300">
                    ← 목록으로 돌아가기
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}