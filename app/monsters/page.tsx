"use client";

import { useState } from "react";
import { supabase } from "../../utils/supabase";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    attribute: "무",
    attr_value: 0,
    move_type: "지상",
    hp: 0,
    mp: 0,
    res_strike: 0,
    res_magic: 0,
    atk_min: 0,
    atk_max: 0,
    exp: 0,
    debuff1: "",
    debuff2: "",
    locations: "",
    drops: "",
    is_boss: false,      
    thunder_bolt: "?",   
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
      return;
    }

    const numberFields = [
      "attr_value", "hp", "mp", "res_strike", "res_magic", 
      "atk_min", "atk_max", "exp"
    ];
    
    setFormData({
      ...formData,
      [name]: numberFields.includes(name) ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!confirm("이 몬스터를 도감에 등록하시겠습니까?")) return;

    setLoading(true);
    const { error } = await supabase.from("monsters").insert([formData]);
    setLoading(false);

    if (error) {
      alert("에러가 발생했습니다 😢\n" + error.message);
    } else {
      alert("등록 완료! 🎉");
      // window.location.reload(); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
          🛠️ 몬스터 도감 등록
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. 기본 정보 */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h2 className="text-lg font-bold mb-4 text-slate-700 border-b pb-2">1. 기본 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">이름</label>
                <input required name="name" type="text" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="예: 청랑" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">이미지 URL</label>
                <input name="image" type="text" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="비워두면 '이미지 없음' 표시" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">속성</label>
                  <select name="attribute" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg bg-white">
                    <option value="무">⚪️ 무</option>
                    <option value="화">🔥 화</option>
                    <option value="수">💧 수</option>
                    <option value="뇌">⚡️ 뇌</option>
                    <option value="풍">🍃 풍</option>
                    <option value="지">🧱 지</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">속성값</label>
                  <input name="attr_value" type="number" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" defaultValue={0} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <div>
                    <label className="block text-sm font-bold mb-1 text-gray-700">타입</label>
                    <select name="move_type" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg bg-white">
                      <option value="지상">🦶 지상</option>
                      <option value="공중">🦅 공중</option>
                    </select>
                 </div>
                 <div className="flex items-center justify-center pt-6">
                    <label className="flex items-center cursor-pointer gap-2 bg-red-50 px-3 py-2 rounded-lg border border-red-100 hover:bg-red-100 transition">
                      <input type="checkbox" name="is_boss" onChange={handleChange} className="w-5 h-5 accent-red-600" />
                      <span className="font-bold text-red-600">👹 보스 몬스터</span>
                    </label>
                 </div>
              </div>
            </div>
          </div>

          {/* 2. 전투 스탯 */}
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <h2 className="text-lg font-bold mb-4 text-red-800 border-b border-red-200 pb-2">2. 전투 스탯</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold mb-1 text-red-700">체력</label>
                <input required name="hp" type="number" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="0" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold mb-1 text-blue-700">마력</label>
                <input required name="mp" type="number" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="0" />
              </div>
              <div className="hidden md:block col-span-2"></div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">타격 저항 (%)</label>
                <input required name="res_strike" type="number" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">마법 저항 (%)</label>
                <input required name="res_magic" type="number" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">최소 공격력</label>
                <input required name="atk_min" type="number" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">최대 공격력</label>
                <input required name="atk_max" type="number" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-1 text-yellow-700">경험치</label>
                <input required name="exp" type="number" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg bg-yellow-50 focus:bg-white transition" />
              </div>
            </div>
          </div>

          {/* 3. 기타 정보 (순서 변경: 디버프 -> 뇌전주) */}
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h2 className="text-lg font-bold mb-4 text-yellow-800 border-b border-yellow-200 pb-2">3. 기타 정보</h2>
            <div className="space-y-5">
              
              <div className="grid grid-cols-3 gap-4">
                {/* 디버프 먼저 배치 */}
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">디버프 1</label>
                  <input name="debuff1" type="text" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="예: 허영갑주" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">디버프 2</label>
                  <input name="debuff2" type="text" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
                </div>

                {/* 뇌전주를 마지막으로 이동 */}
                <div>
                   <label className="block text-sm font-bold mb-1 text-gray-700">뇌전주 유무</label>
                   <select name="thunder_bolt" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg bg-white">
                     <option value="?">? (미확인)</option>
                     <option value="O">O (걸림)</option>
                     <option value="X">X (안 걸림)</option>
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">📍 사냥터 (쉼표로 구분)</label>
                <input required name="locations" type="text" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">💰 드랍 아이템 (쉼표로 구분)</label>
                <input required name="drops" type="text" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-xl transition shadow-lg transform active:scale-95"
          >
            {loading ? "저장 중..." : "도감에 등록하기 ✨"}
          </button>
        </form>
      </div>
    </div>
  );
}