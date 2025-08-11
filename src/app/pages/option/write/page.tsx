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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/1/toast`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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

  useEffect(() => {
    console.log(user?.id, user?.name, accessToken);
  }, []);

  return (
    <div className="write">
      <h2>메뉴 옵션 등록</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="category">
          카테고리
          <input
            type="text"
            id="category"
            {...register("category", { required: true })}
          />
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
