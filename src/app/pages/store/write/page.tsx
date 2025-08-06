"use client";
import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { SubmitHandler, useForm } from "react-hook-form";

type ItemContents = {
  storeName: string;
  userId: number;
  businessNum: string;
  postNum: string;
  description: string;
  phone: string;
  address: string;
  lat: number;
  longti: number;
  image: string;
};

export default function Write({}: ItemContents) {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();

  // data: ItemContents
  const addStore = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeName: "신대방삼거리점",
        userId: user?.id,
        businessNum: "070-1234-5678",
        address: "서울특별시 동작구 어딘가",
        postNum: "06234",
        description: "인터넷 카페입니다.",
        phone: "02-1234-5678",
        lat: 43.535,
        longti: 114.55,
        image: "https://internet.com",
      }),
    });

    console.log(res);
    if (res.status == 201) {
      router.push("../store");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ItemContents>();

  const onSubmit: SubmitHandler<ItemContents> = (data) => {
    // console.log(data);
    addStore();
  };

  useEffect(() => {
    console.log(user?.id, user?.name, accessToken);
  }, []);

  return (
    <div className="write">
      <h2>내 가게 등록</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="storeName">
          점포명
          <input
            type="text"
            id="storeName"
            {...register("storeName", { required: true })}
          />
        </label>
        <label htmlFor="businessNum">
          사업자번호
          <input
            type="phone"
            id="businessNum"
            {...register("businessNum", { required: true })}
          />
        </label>

        {/* 주소 API / 위도 & 경도 값 내부 작업 */}
        <label htmlFor="address">
          점포 주소
          <input
            type="phone"
            id="address"
            {...register("address", { required: true })}
          />
        </label>
        <label htmlFor="postNum">
          우편번호
          <input
            type="text"
            id="postNum"
            {...register("postNum", { required: true })}
          />
        </label>
        <DaumPostcodeEmbed />

        <label htmlFor="description">
          점포 설명
          <input
            type="text"
            id="description"
            {...register("description", { required: true })}
          />
        </label>
        <label htmlFor="phone">
          대표 전화번호
          <input
            type="text"
            id="phone"
            {...register("phone", { required: true })}
          />
        </label>

        <label htmlFor="image">
          점포 이미지
          <input
            type="file"
            id="image"
            {...register("image", { required: true })}
          />
        </label>
        <input type="submit" />
      </form>
      <Link href="../store">상점 목록</Link>
    </div>
  );
}
