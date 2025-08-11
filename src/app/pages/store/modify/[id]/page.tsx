"use client";
import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { SubmitHandler, useForm } from "react-hook-form";

type StoreType = {
  address: string;
  businessNum: string;
  created_at: string;
  description: string;
  id: number;
  image: string;
  lat: number;
  longti: number;
  phone: string;
  postNum: string;
  storeName: string;
  updated_at: string;
};
export default function Modify() {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();
  const [storeInfo, setStoreInfo] = useState<StoreType>();
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");

  const searchParams = useSearchParams();
  const storeId = searchParams.get("id");
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

  async function getStoreInfo() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/${storeId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    console.log(result);
    setStoreInfo(result);
  }

  const delStoreInfo = async () => {
    const id = searchParams.get("id");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
  };

  async function updateStoreInfo(data: StoreType) {
    const id = searchParams.get("id");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: data.address,
        businessNum: data.businessNum,
        created_at: data.created_at,
        description: data.description,
        id: data.id,
        image: data.image,
        lat: data.lat,
        longti: data.longti,
        phone: data.phone,
        postNum: data.postNum,
        storeName: data.storeName,
      }),
    });

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
  } = useForm<StoreType>();

  const onSubmit: SubmitHandler<StoreType> = (data) => {
    updateStoreInfo(data);
  };

  useEffect(() => {
    getStoreInfo();
  }, []);

  return (
    <div>
      <h2>토스트 메뉴 수정</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="storeName">
            점포명
            <input
              type="text"
              id="storeName"
              defaultValue={storeInfo?.storeName}
              {...register("storeName", { required: true })}
            />
          </label>
        </div>
        <div>
          <label htmlFor="businessNum">
            사업자번호
            <input
              type="phone"
              id="businessNum"
              {...register("businessNum", { required: true })}
            />
          </label>
        </div>
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
        <Link href="../../nomal">글목록</Link>
        <a onClick={() => delStoreInfo()}>글삭제</a>
        <input type="submit" />
      </form>
    </div>
  );
}
