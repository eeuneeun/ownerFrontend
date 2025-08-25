"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { useStoreStore } from "@/app/_store/storeStore";
import { Pagination } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
type Toast = {
  id: number;
  category: string;
  name: string;
  desc: string;
  imgUrl: string;
  price: number;
};
export default function Toast() {
  const [list, setList] = useState<Toast[]>([
    {
      category: "toast",
      desc: "햄토스트",
      id: 1,
      imgUrl: "C://example.toast/ham",
      name: "햄토스트",
      price: 6500,
    },
  ]);
  const { accessToken } = useAuthStore();
  const { storeId } = useStoreStore();

  // 데이터 불러오기
  async function getToastList() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/store/${storeId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log([data]);
    setList(data);
  }

  useEffect(() => {
    getToastList();
  }, [accessToken]);

  return (
    <>
      <div className="toast">
        <h2>메뉴 관리</h2>

        <div className="toast-wrap">
          <div className="flex-center">
            <Link href={"./menu/write"} className="add-btn">
              메뉴 추가
            </Link>
          </div>
          <ol className="toast-list">
            {Array.isArray(list) &&
              list.map((item, index) => (
                <li key={item.name + index}>
                  <Link
                    href={{
                      pathname: `./menu/view/${item.id}`,
                      query: { id: item.id, ref: "menu" },
                    }}
                  >
                    <img
                      src="http://localhost:3000/file.svg"
                      alt="기본 토스트"
                    />
                    <dl>
                      <dt>{item.name}</dt>
                      <dd>{Math.floor(item?.price)}원</dd>
                      <dd> {item.desc}</dd>
                    </dl>

                    {Array.isArray(item.menuGroups) && (
                      <ul className="width-100">
                        {item.menuGroups.map((group, idx: number) => (
                          <li
                            key={group.group.name + idx}
                            className="width-100 padding-0"
                          >
                            <span className=" group-badge">
                              {group.group.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Link>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </>
  );
}
