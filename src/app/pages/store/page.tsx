"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { useStoreStore } from "@/app/_store/storeStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Store({}: Props) {
  const router = useRouter();
  const [storeList, setStoreList] = useState([
    {
      address: "서울특별시 동작구 어딘가",
      businessNum: "070-1234-5678",
      created_at: "2025-08-06T03:14:22.296+00:00",
      description: "인터넷 카페입니다.",
      id: 1,
      image: "https://internet.com",
      lat: 43.535,
      longti: 114.55,
      ownerName: "aaaa",
      phone: "02-1234-5678",
      postNum: "06234",
      storeName: "신대방삼거리점",
      updated_at: "2025-08-06T03:14:22.296+00:00",
    },
  ]);
  const { user, accessToken } = useAuthStore();
  const { storeId } = useStoreStore();

  async function getStoreInfo() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/${storeId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    console.log(result);
    setStoreList([result]);
  }
  useEffect(() => {
    getStoreInfo();
    // 가게 리스트를 유저 아이로 조회
    // 있으면 리스트를 뿌려주고, 없으면 가게 등록 버튼 노출
  }, [accessToken]);

  return (
    <div className="store">
      <h2>내 가게</h2>
      <div className="store-wrap">
        <Link href="/pages/store/write" className="add-btn">
          가게 등록
        </Link>
        <ul className="store-list">
          {storeList.map((item, idx) => (
            <li key={item.storeName + idx}>
              <img src="/common-store.png" alt={item.storeName} />
              <dl>
                <dt>{item.storeName}</dt>
                <dd>{item.address}</dd>
                <dd>대표자 : {item.ownerName}</dd>
                <dd>대표번호 : {item.phone}</dd>
              </dl>
              <div className="btn-wrap">
                <button className="view-btn">보기</button>
                <button className="modify-btn">수정</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
