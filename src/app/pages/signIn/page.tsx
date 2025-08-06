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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const result = await res.json();
    //accessToken
    //refreshToken
    //userName
    //userId

    const userData = {
      id: result.userId,
      name: result.userName,
    };

    if (res.status == 201) {
      login(result.accessToken, userData);

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
        <label htmlFor="email">
          ID
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
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
