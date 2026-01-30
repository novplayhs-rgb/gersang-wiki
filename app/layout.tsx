import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "천하제일 거상 위키",
  description: "거상 몬스터 정보를 모아놓은 위키입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">
        {/* 👇 여기부터: 모든 페이지에 보일 상단 메뉴바 (Navbar) */}
        <nav className="bg-blue-800 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            {/* 로고 (클릭하면 홈으로) */}
            <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition">
              🐯 거상 위키
            </Link>

            {/* 오른쪽 메뉴들 */}
            <div className="space-x-6 font-semibold">
              <Link href="/" className="hover:text-yellow-300 transition">
                홈으로
              </Link>
              <Link href="#" className="hover:text-yellow-300 transition text-gray-400 cursor-not-allowed">
                아이템 도감 (준비중)
              </Link>
              <Link href="#" className="hover:text-yellow-300 transition text-gray-400 cursor-not-allowed">
                용병 도감 (준비중)
              </Link>
            </div>
          </div>
        </nav>
        {/* 👆 여기까지 메뉴바 끝 */}

        {/* 👇 여기가 페이지 내용이 들어가는 구멍 (Slot) */}
        <main className="max-w-6xl mx-auto mt-6">
          {children}
        </main>
        
        {/* 바닥글 (Footer) 도 추가 가능 */}
        <footer className="mt-20 py-6 text-center text-gray-500 text-sm border-t">
          © 2026 Gersang Wiki. All rights reserved.
        </footer>
      </body>
    </html>
  );
}