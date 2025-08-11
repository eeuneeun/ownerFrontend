"use client";
import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  function signOut() {
    logout();
    router.push("/");
  }
  return (
    <div className="mypage">
      <h2>마이 페이지</h2>
      <div>
        <img src="/vercel.svg" alt="프로필 사진" />
        <ul>
          <li>
            이름 : 원은재
            <button>수정</button>
          </li>
          <li>
            닉네임 : 은은
            <button>수정</button>
          </li>
          <li>
            이메일 : sacroo@naver.com
            <button>수정</button>
          </li>
          <li>
            <Link href="/pages/mypage/order">주문내역</Link>
          </li>
          <li>
            <button onClick={signOut}>로그아웃</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
