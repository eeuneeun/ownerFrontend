"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type User = {
  userId: string;
  password: string;
  name: string;
  email: string;
  nickname: string;
  storeName: string;
  storeAddress: string;
  ownerName: string;
  ownerPhone: number;
};
export default function SignUp() {
  const router = useRouter();

  const addItem = async (data: User) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: data.userId,
        password: data.password,
        name: data.name,
        email: data.email,
        nickname: data.nickname,
      }),
    });
    if (res.status == 201) {
      router.push("/signIn");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    addItem(data);
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userID">
          ID
          <input
            type="text"
            id="userId"
            {...register("userId", { required: true })}
          />
        </label>
        <label htmlFor="password">
          PASSWORD
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
        </label>
        <label htmlFor="name">
          NAME
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
        </label>
        <label htmlFor="nickname">
          NICK NAME
          <input
            type="text"
            id="nickname"
            {...register("nickname", { required: true })}
          />
        </label>
        <label htmlFor="email">
          E-MAIL
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
        </label>
        <button>가입</button>
      </form>
      {/* 
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="storeName">
          점포 이름
          <input
            type="text"
            id="storeName"
            {...register("storeName", { required: true })}
          />
        </label>
        <label htmlFor="storeAddress">
          가게 주소
          <input
            type="text"
            id="storeAddress"
            {...register("storeAddress", { required: true })}
          />
        </label>
        <label htmlFor="ownerName">
          대표자명
          <input
            type="text"
            id="ownerName"
            {...register("ownerName", { required: true })}
          />
        </label>
        <label htmlFor="ownerPhone">
          대표자 연락처
          <input
            type="phone"
            id="ownerPhone"
            {...register("ownerPhone", { required: true })}
          />
        </label>
        <button>가입</button>
      </form> */}
    </div>
  );
}
