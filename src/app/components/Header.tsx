import Link from "next/link";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="header">
      <Link href="/">EUN TOAST</Link>
      <Link href="/pages/mypage" className="mypage">
        마이페이지
      </Link>
    </div>
  );
}
