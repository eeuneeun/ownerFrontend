"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { access } from "fs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type User = {
  userId: string;
  password: string;
  name: string;
  email: string;
  nickname: string;
};
export default function SignIn() {
  const router = useRouter();
  const { login } = useAuthStore();

  const signin = async (data: User) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: data.userId,
        password: data.password,
      }),
    });
    const result = await res.json();

    console.log("result", result);

    const userData = {
      userId: result.userInfo.userId,
      userName: result.userInfo.userName,
      email: result.userInfo?.email,
      nickname: result.userInfo.nickname,
    };

    if (res.status == 200) {
      login(result.accessToken, result.refreshToken, userData);
      router.push("/");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    signin(data);
    console.log(data);
  };
  return (
    <div className="sign-in">
      <h2>로그인</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userId">
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
        <button className="login-btn">로그인</button>
      </form>
      <Link href="/pages/signUp" className="signup-btn">
        회원가입
      </Link>
    </div>
  );
}
