import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* 1. 히어로 섹션 (대문 타이틀) */}
      <div className="flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
          천하제일 <span className="text-yellow-400">거상 위키</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl">
          몬스터 정보, 사냥터, 퀘스트 공략까지.<br />
          거상의 모든 데이터를 집대성하다.
        </p>
      </div>

      {/* 2. 메뉴 카드 섹션 */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 카드 1: 몬스터 도감 */}
          <Link 
            href="/monsters"
            className="group bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-8 transition duration-300 hover:-translate-y-2"
          >
            <div className="text-5xl mb-6">🐲</div>
            <h2 className="text-3xl font-bold mb-3 group-hover:text-yellow-400 transition">
              몬스터 도감
            </h2>
            <p className="text-slate-400 leading-relaxed">
              청랑, 광혼, 인면지주...<br />
              모든 몬스터의 체력, 저항력, 드랍 아이템 정보를 확인하고 킬각을 계산하세요.
            </p>
          </Link>

          {/* 카드 2: 사냥터 정보 (준비중) */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-8 opacity-60 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
              준비중
            </div>
            <div className="text-5xl mb-6">🗺️</div>
            <h2 className="text-3xl font-bold mb-3 text-slate-500">
              사냥터 정보
            </h2>
            <p className="text-slate-500 leading-relaxed">
              대관령, 검은상단 주둔지 등<br />
              주요 사냥터의 출몰 몬스터와 가는 길 정보를 정리 중입니다.
            </p>
          </div>

          {/* 카드 3: 관리자 페이지 (숨겨진 메뉴) */}
          <Link 
            href="/admin"
            className="group bg-slate-800 border border-slate-700 rounded-2xl p-8 transition duration-300 hover:border-blue-500"
          >
            <div className="text-5xl mb-6">🛠️</div>
            <h2 className="text-3xl font-bold mb-3 group-hover:text-blue-400 transition">
              데이터 관리
            </h2>
            <p className="text-slate-400 leading-relaxed">
              새로운 몬스터나 정보를 추가하시겠습니까?<br />
              관리자 권한으로 DB를 업데이트하세요.
            </p>
          </Link>

        </div>
      </div>

      {/* 3. 푸터 */}
      <footer className="text-center text-slate-500 py-12 mt-12 border-t border-white/10">
        <p>© 2026 Gersang Wiki Project. Created by You.</p>
      </footer>
    </div>
  );
}