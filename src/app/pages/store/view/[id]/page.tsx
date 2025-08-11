"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { useStoreStore } from "@/app/_store/storeStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};
type StoreType = {
  address: string;
  businessNum: string;
  created_at: string;
  description: string;
  id: number;
  image: string;
  lat: number;
  longti: number;
  phone: string;
  postNum: string;
  storeName: string;
  updated_at: string;
};
export default function StoreView({}: Props) {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();
  const [storeInfo, setStoreInfo] = useState<StoreType>();
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
  }, [accessToken]);

  return (
    <div className="store view">
      <h2>내 가게</h2>
      <div>
        <ul>
          <li>
            <img src="/common-store.png" alt={storeInfo?.storeName} />
            <dl>
              <dt>{storeInfo?.storeName}</dt>
              <dd>주소지 : {storeInfo?.address}</dd>
              <dd>우편번호 : {storeInfo?.postNum}</dd>
              <dd>사업자 번호 : {storeInfo?.businessNum}</dd>
              <dd>대표 번호 : {storeInfo?.phone}</dd>
            </dl>
          </li>

          <li>
            <dl>
              <dt>소속 메뉴</dt>
              <dd>햄치즈 토스트 3000원</dd>
              <dd>햄치즈 토스트 3000원</dd>
              <dd>햄치즈 토스트 3000원</dd>
              <dd>햄치즈 토스트 3000원</dd>
              <dd>햄치즈 토스트 3000원</dd>
            </dl>
          </li>
        </ul>

        <div className="btn-wrap">
          <Link href="../" className="list-btn">
            상점 목록
          </Link>
          <Link
            href={{
              pathname: `../modify/${storeInfo?.id}`,
              query: { id: storeInfo?.id, ref: "store" },
            }}
            className="modify-btn"
          >
            수정
          </Link>
        </div>
      </div>
    </div>
  );
}
