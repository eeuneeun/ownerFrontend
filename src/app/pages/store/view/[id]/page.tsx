"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { useStoreStore } from "@/app/_store/storeStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function StoreView({}: Props) {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();
  const [storeInfo, setStoreInfo] = useState();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("id");

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
    setStoreInfo(result);
  }
  useEffect(() => {
    getStoreInfo();
    // 가게 리스트를 유저 아이로 조회
    // 있으면 리스트를 뿌려주고, 없으면 가게 등록 버튼 노출
  }, []);

  return (
    <div className="store view">
      <h2>내 가게</h2>
      <div>
        <ul>
          <li>
            <img src={storeInfo?.image} alt={storeInfo.storeName} />
            <dl>
              <dt>{storeInfo?.storeName}</dt>
              <dd>주소지 : {storeInfo?.address}</dd>
              <dd>우편번호 : {storeInfo?.postNum}</dd>
              <dd>사업자 번호 : {storeInfo?.businessNum}</dd>
              <dd>대표 번호 : {storeInfo?.phone}</dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  );
}
