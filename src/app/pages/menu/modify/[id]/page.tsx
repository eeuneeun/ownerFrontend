"use client";
import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type MenuType = {
  category: string;
  name: string;
  desc: string;
  imgUrl: string;
  price: number;
};

export default function Modify() {
  const [menu, setItems] = useState({
    category: "",
    name: "",
    desc: "",
    imgUrl: "",
    price: 0,
  });

  const { user, accessToken } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuId = searchParams.get("id");
  console.log(menuId);

  const getItem = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/${menuId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setItems(data);
  };

  const delItem = async () => {
    const id = searchParams.get("id");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/${menuId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
  };

  async function updateItem(data: MenuType) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/${menuId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: data.category,
          name: data.name,
          desc: data.desc,
          imgUrl: "/combi.jpg",
          price: data.price,
        }),
      }
    );

    if (!res.ok) throw new Error("업데이트 실패");
    if (res.status == 200) {
      router.push("../");
    }
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MenuType>();

  const onSubmit: SubmitHandler<MenuType> = (data) => {
    updateItem(data);
  };

  useEffect(() => {
    getItem();
  }, [accessToken]);

  return (
    <div>
      <h2>토스트 메뉴 수정</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="category">
          <label htmlFor="category">카테고리 선택</label>
          <select id="category" {...register("category")}>
            <option value="">선택하세요</option>
            <option value="toast">토스트</option>
            <option value="side">사이드</option>
            <option value="sandwich">샌드위치</option>
            <option value="bevarage">음료수</option>
            <option value="coffee">커피</option>
          </select>
        </label>
        <label htmlFor="name">
          상품명
          <input
            type="text"
            id="name"
            defaultValue={menu.name}
            {...register("name", { required: true })}
          />
        </label>
        <label htmlFor="desc">
          상품 설명
          <textarea
            id="desc"
            defaultValue={menu.desc}
            {...register("desc", { required: true })}
          />
        </label>
        <label htmlFor="price">
          가격
          <input
            type="text"
            id="price"
            defaultValue={menu.price}
            {...register("price", { required: true })}
          />
        </label>
        <label htmlFor="imgUrl">
          상품 이미지
          <input
            type="file"
            id="imgUrl"
            defaultValue={menu.imgUrl}
            {...register("imgUrl", { required: true })}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
