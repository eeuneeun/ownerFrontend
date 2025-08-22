"use client";

import Link from "next/link";
import React from "react";
import { useAuthStore } from "../_store/authStore";
import { useStoreStore } from "../_store/storeStore";

type Props = {};

export default function Header({}: Props) {
  const { user, logout } = useAuthStore();
  const { name } = useStoreStore();
  return (
    <div className="header">
      <Link href={"/"} className="store">
        {name}
      </Link>

      <Link href="/">EUN TOAST</Link>
      {user == null ? (
        <Link href="/signIn" className="mypage">
          로그인
        </Link>
      ) : (
        <Link href="/mypage" className="mypage">
          마이페이지
        </Link>
      )}
    </div>
  );
}
