"use client";

import Link from "next/link";
import React, { useEffect } from "react";

type Props = {};

export default function Store({}: Props) {
  useEffect(() => {
    // 가게 리스트를 유저 아이로 조회
    // 있으면 리스트를 뿌려주고, 없으면 가게 등록 버튼 노출
  }, []);

  return (
    <div className="store">
      <h2>내 가게</h2>
      <div>
        <Link href="/pages/store/write">가게 등록</Link>
        <ul>
          <li>
            <dl>
              <dt>신대방 삼거리점</dt>
              <dd>서울시 동작구 신대방동 어쩌구</dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  );
}
