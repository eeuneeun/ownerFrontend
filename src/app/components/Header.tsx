"use client";

import Link from "next/link";
import React from "react";
import { useAuthStore } from "../_store/authStore";

type Props = {};

export default function Header({}: Props) {
  const { user, logout } = useAuthStore();
  return (
    <div className="header">
      <Link href="/">EUN TOAST</Link>
      {user == null ? (
        <Link href="/pages/signIn" className="mypage">
          로그인
        </Link>
      ) : (
        <Link href="/pages/mypage" className="mypage">
          마이페이지
        </Link>
      )}
    </div>
  );
}
