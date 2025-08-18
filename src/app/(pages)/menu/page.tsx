"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { Pagination } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
type Toast = {
  menuId: number;
  category: string;
  name: string;
  des: string;
  imgUrl: string;
  price: string;
};
export default function Toast() {
  const [list, setList] = useState<Toast[]>([]);
  const { user, accessToken } = useAuthStore();

  // 데이터 불러오기
  async function getToastList() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
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
                      pathname: `./menu/view/${item.menuId}`,
                      query: { id: item.menuId, ref: "menu" },
                    }}
                  >
                    <img
                      src="http://localhost:3000/file.svg"
                      alt="기본 토스트"
                    />
                    <dl>
                      <dt>{item.name}</dt>
                      <dd>{item.price}원</dd>
                      <dd> {item.des}</dd>
                    </dl>
                  </Link>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </>
  );
}
