"use client";
import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { SubmitHandler, useForm } from "react-hook-form";

type createStoreType = {
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

export default function Write({}) {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<createStoreType>();

  // 가게 추가 API 호출
  const addStore = async (data: createStoreType) => {
    console.log("111");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeName: data.storeName,
        userId: user?.userId,
        businessNum: data.businessNum,
        address: address,
        postNum: postCode,
        description: data.description,
        phone: data.phone,
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

  // Form 제출
  const onSubmit: SubmitHandler<createStoreType> = (data: createStoreType) => {
    console.log(data);
    addStore(data);
  };

  // 주소 찾기
  const handleComplete = (data: Address) => {
    // 도로명 주소
    let fullAddress = data.address;
    let extraAddress = "";

    // 참고항목 (법정동, 건물명 등)
    if (data.addressType === "R") {
      if (data.bname) {
        extraAddress += data.bname;
      }
      if (data.buildingName) {
        extraAddress += extraAddress
          ? `, ${data.buildingName}`
          : data.buildingName;
      }
      fullAddress += extraAddress ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    setPostCode(data.zonecode);
    // console.log("우편번호:", data.zonecode);
    // console.log("주소:", fullAddress);
  };

  useEffect(() => {
    console.log(user?.userId, user?.userName, accessToken);
  }, []);

  useEffect(() => {
    console.log(address);
  }, [address]);

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
          <input type="text" id="address" value={address} readOnly />
        </label>
        <label htmlFor="postNum">
          우편번호
          <input type="text" id="postNum" value={postCode} readOnly />
        </label>
        <DaumPostcodeEmbed onComplete={handleComplete} />

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
