"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { useStoreStore } from "@/app/_store/storeStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};
type Store = {
  address: string;
  businessNum: string;
  created_at: string;
  description: string;
  id: number;
  image: string;
  lat: number;
  longti: number;
  ownerName: string;
  phone: string;
  postNum: string;
  storeName: string;
  updated_at: string;
};

export default function Store({}: Props) {
  const router = useRouter();
  const [storeList, setStoreList] = useState<Store[] | null>(null);
  const { user, accessToken } = useAuthStore();
  const { storeId } = useStoreStore();

  async function getStoreInfo() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);
    setStoreList(result);
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
          {Array.isArray(storeList) ? (
            storeList.map((item, idx) => (
              <li key={item.storeName + idx}>
                <img src="/common-store.png" alt={item.storeName} />
                <dl>
                  <dt>{item.storeName}</dt>
                  <dd>{item.address}</dd>
                  <dd>우편번호 : {item.postNum}</dd>
                  <dd>대표번호 : {item.phone}</dd>
                </dl>
                <div className="btn-wrap">
                  <Link
                    href={{
                      pathname: `./store/view/${item.id}`,
                      query: { id: item.id, ref: "store" },
                    }}
                    className="view-btn"
                  >
                    보기
                  </Link>
                  <Link
                    href={{
                      pathname: `./store/modify/${item.id}`,
                      query: { id: item.id, ref: "store" },
                    }}
                    className="modify-btn"
                  >
                    수정
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <li>아직 등록된 가게가 없습니다</li>
          )}
        </ul>
      </div>
    </div>
  );
}
