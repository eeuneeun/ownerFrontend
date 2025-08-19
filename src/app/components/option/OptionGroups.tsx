import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = { activetab: string };
type Group = {
  id: number;
  name: string;
  des: string;
  imgUrl: string;
  price: number;
};
export default function OptionGroups({ activetab }: Props) {
  const [list, setList] = useState<Group[]>([
    {
      id: 1,
      name: "피클",
      des: "새콤하고 맛있는 피클",
      imgUrl: "/banner01.png",
      price: 500,
    },
  ]);
  const { user, accessToken } = useAuthStore();
  // 데이터 불러오기
  async function getGroupList() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/option`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setList(data);
  }

  useEffect(() => {
    getGroupList();
  }, [accessToken]);

  return (
    <div className={`option ${activetab == "group" ? "active" : ""}`}>
      <h3> OptionGroups</h3>
      <Link href="./group/write" className="add-btn">
        +
      </Link>
      <ol className="toast-list">
        <li>
          <img
            src="http://localhost:3000/option_icons/pickle.svg"
            alt="기본 토스트"
          />
          <dl>
            <dt>피클</dt>
            <dd>500 원</dd>
            <dd>새콤달콤 맛있는 피클</dd>
          </dl>
        </li>
      </ol>
    </div>
  );
}
