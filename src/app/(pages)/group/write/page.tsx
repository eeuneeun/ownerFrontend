"use client";
import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ItemContents = {
  name: string;
  desc: string;
};

export default function Write({}: ItemContents) {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();

  const addItem = async (data: ItemContents) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/group`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        desc: data.desc,
      }),
    });

    const result = await res.json();
    console.log(res);

    if (res.status == 201) {
      router.push("../option");
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
    console.log(user?.userId, user?.userName, accessToken);
  }, []);

  return (
    <div className="write">
      <h2>옵션 그룹 등록</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          그룹명
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
        </label>
        <label htmlFor="desc">
          옵션 그룹 설명
          <textarea id="desc" {...register("desc", { required: true })} />
        </label>

        <input type="submit" />
      </form>
      <Link href="../nomal">글목록</Link>
    </div>
  );
}
