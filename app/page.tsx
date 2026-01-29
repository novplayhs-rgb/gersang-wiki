import Link from "next/link";
export default function Home() {
  // 1. 여기가 '데이터 창고'입니다. (나중엔 이 부분을 엑셀 파일이나 DB에서 가져오게 됩니다)
  // const는 '변수'를 만드는 명령어입니다.
  const monsters = [
    { id: 1, name: "청랑", hp: "120,000", location: "검은상단 주둔지", drop: "낡은태부", image: "/mob1.jpg" },
    { id: 2, name: "광호", hp: "80,000", location: "무령왕릉", drop: "검은수정", image: "/mob2.jpg" },
    { id: 3, name: "홍작", hp: "500,000", location: "화구산", drop: "주작의근원", image: "/mob3.jpg" },
    // 예시: 홍작 밑에 콤마 찍고 추가
    { id: 4, name: "기문교주", hp: "600,000", location: "대관령", drop: "기문교주의지팡이", image: "/mob4.jpg" },  
  ];

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <h1 className="text-5xl font-bold text-blue-700">천하제일 거상 위키</h1>
      <p className="mt-4 text-xl text-gray-600 mb-10">
        데이터 개수: {monsters.length}마리 (자동으로 카운트됨)
      </p>

      {/* 2. 여기가 '반복 기계'입니다. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* monsters.map = "몬스터 목록 하나하나 꺼내서 아래 모양으로 바꿔라" */}
        {monsters.map((mob) => (
<Link 
  href={`/monster/${mob.id}`} 
  key={mob.id} 
  className="border-2 border-gray-300 p-6 rounded-lg hover:bg-blue-50 transition shadow-lg block"
>
            {/* ⭐️ 이미지 추가된 부분 시작 */}
            <div className="relative w-full h-48 mb-4 bg-gray-200 rounded-md overflow-hidden">
               {/* alt는 시각장애인용 설명, src는 이미지 주소 */}
               <img 
                 src={mob.image} 
                 alt={mob.name} 
                 className="object-cover w-full h-full"
               />
            </div>
            {/* ⭐️ 이미지 추가된 부분 끝 */}

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