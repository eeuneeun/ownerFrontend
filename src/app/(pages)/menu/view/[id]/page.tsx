"use client";
import { useAuthStore } from "@/app/_store/authStore";
import { useStoreStore } from "@/app/_store/storeStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Toast = {
  id: number;
  imgUrl: string;
  name: string;
  desc: string;
  price: number;
  menuGroups: [];
};

export default function View() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { user, accessToken } = useAuthStore();
  const { storeId } = useStoreStore();

  const [toast, setToast] = useState({
    id: 1,
    name: "",
    desc: "",
    price: 0,
    imgUrl: "",
    menuGroups: [],
  });

  const getItem = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/${id}/store/${storeId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data: Toast = await response.json();
    console.log(data);
    setToast(data);
  };

  const delItem = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`, {
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

          <dd>{toast?.desc}</dd>
          <dd>가격 : {toast?.price}</dd>
          {/* <dd>등록일 : {toast?.createAt}</dd> */}
        </dl>

        <div className="add-group">
          <h3>추가된 그룹</h3>
          <ul>
            {Array.isArray(toast.menuGroups) &&
              toast.menuGroups.map((item, idx) => (
                <>
                  <li>{item.group.name}</li>
                  <li>{item.group.desc}</li>
                </>
              ))}
          </ul>
        </div>

        <div className="btn-wrap flex-between">
          <Link href="../modify" className="list-btn">
            옵션추가
          </Link>
          <Link
            href={{
              pathname: `../modify/${toast.id}`,
              query: { id: toast.id, ref: "menu" },
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
