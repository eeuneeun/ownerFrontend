"use client";
import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ItemContents = {
  category: string;
  name: string;
  desc: string;
  imgUrl: string;
  price: string;
};

export default function Write({}: ItemContents) {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();

  const addItem = async (data: ItemContents) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "aaaa",
        storeId: 3,
        category: data.category,
        name: data.name,
        desc: data.desc,
        price: data.price,
        imgUrl: "C://example.toast/ham",
      }),
    });

    const result = await res.json();
    console.log(result);

    if (res.status == 201) {
      router.push("../menu");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ItemContents>();

  const onSubmit: SubmitHandler<ItemContents> = (data) => {
    console.log(data);
    addItem(data);
  };

  useEffect(() => {}, []);

  return (
    <div className="write">
      <h2>토스트 메뉴 등록</h2>
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
            {...register("name", { required: true })}
          />
        </label>
        <label htmlFor="desc">
          상품 설명
          <textarea id="desc" {...register("desc", { required: true })} />
        </label>
        <label htmlFor="price">
          가격
          <textarea id="price" {...register("price", { required: true })} />
        </label>
        <label htmlFor="imgUrl">
          상품 이미지
          <input
            type="file"
            id="imgUrl"
            {...register("imgUrl", { required: true })}
          />
        </label>
        <input type="submit" />
      </form>
      <Link href="../nomal">글목록</Link>
    </div>
  );
}
