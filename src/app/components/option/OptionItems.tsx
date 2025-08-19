import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = { activetab: string };
type Opition = {
  id: number;
  name: string;
  des: string;
  imgUrl: string;
  price: number;
};

export default function OptionItems({ activetab }: Props) {
  const [list, setList] = useState<Opition[]>([
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
  async function getOptionList() {
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
    getOptionList();
  }, [accessToken]);

  return (
    <div className={`option ${activetab == "option" ? "active" : ""}`}>
      <h3>OptionItems</h3>
      <Link href="./option/write" className="add-btn">
        +
      </Link>
      <ol className="toast-list">
        {Array.isArray(list) &&
          list.length > 0 &&
          list.map((item, idx) => (
            <li key={item.name + idx}>
              <img
                src="http://localhost:3000/option_icons/pickle.png"
                alt={item.name}
              />
              <dl>
                <dt>{item.name}</dt>
                <dd>{item.price}원</dd>
                <dd>{item.des}</dd>
              </dl>
              <div className="btn-wrap">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}
