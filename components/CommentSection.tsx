"use client";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

interface Comment {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  password?: string; // 삭제할 때 비교용 (DB에서 가져올 땐 보안상 안 가져오는 게 정석이나, 간단하게 구현)
}

interface Props {
  category: string;  // 예: "monster", "map", "quest"
  targetId: number;  // 예: 1 (청랑 ID)
}

export default function CommentSection({ category, targetId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState({ nickname: "", password: "", content: "" });
  const [loading, setLoading] = useState(false);

  // 1. 댓글 불러오기 (Read)
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("category", category)       // 1. 카테고리(monster)가 맞고
      .eq("target_id", targetId)      // 2. 그 중에서도 이 놈(청랑)인 것만
      .order("created_at", { ascending: false }); // 최신순 정렬

    if (!error) setComments(data || []);
  };

  useEffect(() => {
    fetchComments();
  }, [category, targetId]);

  // 2. 댓글 등록하기 (Create)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.content.trim() || !form.nickname || !form.password) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("comments").insert([
      {
        category,          // "monster"
        target_id: targetId, // 1
        nickname: form.nickname,
        password: form.password,
        content: form.content,
      },
    ]);
    setLoading(false);

    if (error) {
      alert("댓글 등록 실패 😢");
    } else {
      setForm({ nickname: "", password: "", content: "" }); // 입력창 초기화
      fetchComments(); // 목록 새로고침
    }
  };

  // 3. 댓글 삭제하기 (Delete)
  const handleDelete = async (id: number) => {
    const inputPwd = prompt("댓글 비밀번호를 입력하세요:");
    if (!inputPwd) return;

    // 비밀번호 확인 (실무에선 서버에서 체크해야 하지만, 지금은 간단하게)
    // 먼저 해당 댓글의 진짜 비밀번호를 가져옴
    const { data: targetComment } = await supabase
      .from("comments")
      .select("password")
      .eq("id", id)
      .single();

    if (targetComment?.password === inputPwd) {
      const { error } = await supabase.from("comments").delete().eq("id", id);
      if (!error) {
        alert("삭제되었습니다.");
        fetchComments();
      }
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        💬 유저 코멘트 <span className="text-blue-600 text-sm">({comments.length})</span>
      </h3>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="닉네임"
            className="border p-2 rounded w-1/3 text-sm"
            value={form.nickname}
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          />
          <input
            type="password"
            placeholder="비밀번호(4자리)"
            className="border p-2 rounded w-1/3 text-sm"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-1/3 rounded font-bold hover:bg-blue-700 text-sm transition"
          >
            {loading ? "등록 중.." : "등록"}
          </button>
        </div>
        <textarea
          placeholder="이 몬스터에 대한 꿀팁이나 정보를 공유해주세요!"
          className="w-full border p-2 rounded h-20 text-sm resize-none focus:outline-blue-500"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </form>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-400 py-4">첫 번째 댓글을 남겨보세요!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-800">{comment.nickname}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-xs text-red-400 hover:text-red-600 underline"
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}