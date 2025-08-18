"use client";
import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Toast = {
  menuId: number;
  imgUrl: string;
  name: string;
  des: string;
  price: number;
};

export default function View() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { user, accessToken } = useAuthStore();

  const [toast, setToast] = useState({
    menuId: 1,
    name: "",
    des: "",
    price: 0,
    imgUrl: "",
  });

  const getItem = async () => {
    const response = await fetch(`http://localhost:8080/menu/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data: Toast = await response.json();
    console.log(data);
    setToast(data);
  };
  const delItem = async () => {
    const res = await fetch(`http://localhost:8080/menu/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      router.push("../");
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="toast view">
      <h2>메뉴 상세</h2>

      <div className="view-wrap">
        <img src="/combi.jpg" alt={toast.name} />
        <dl>
          <dt>{toast?.name}</dt>

          <dd>{toast?.des}</dd>
          <dd>가격 : {toast?.price}</dd>
          {/* <dd>등록일 : {toast?.createAt}</dd> */}
        </dl>

        <div className="btn-wrap flex-between">
          <Link href="../" className="list-btn">
            목록으로
          </Link>
          <Link
            href={{
              pathname: `../modify/${toast.menuId}`,
              query: { id: toast.menuId, ref: "home" },
            }}
            className="modify-btn"
          >
            상품 수정
          </Link>
          <button onClick={() => delItem()}>상품 삭제</button>
        </div>
      </div>
    </div>
  );
}
