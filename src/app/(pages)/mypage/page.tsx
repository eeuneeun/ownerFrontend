"use client";
import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPage() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { user, accessToken } = useAuthStore();
  const [userInfo, setUserInfo] = useState();

  function signOut() {
    logout();
    router.push("/");
  }

  // 데이터 불러오기
  async function getUserData() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${user?.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setUserInfo(data);
  }

  useEffect(() => {
    getUserData();
  }, [user]);
  return (
    <div className="mypage">
      <h2>마이 페이지</h2>
      <div>
        <img src="/vercel.svg" alt="프로필 사진" />
        <ul>
          <li>
            이름 : {userInfo?.name}
            <button>수정</button>
          </li>

          <li>
            <Link href="/mypage/order">주문내역</Link>
          </li>
          <li>
            <button onClick={signOut}>로그아웃</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
