import { useAuthStore } from "@/app/_store/authStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = { activetab: string };
type Group = {
  id: 1;
  name: string;
  des: string;
};
export default function OptionGroups({ activetab }: Props) {
  const [list, setList] = useState<Group[]>([
    {
      id: 1,
      name: "피클",
      des: "새콤하고 맛있는 피클",
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
        {Array.isArray(list) &&
          list.length > 0 &&
          list.map((item, idx) => (
            <li key={item.name + idx}>
              <Link href={`/group/view/${item.id}`}>
                <dl>
                  <dt>{item.name}</dt>
                  <dd>{item.des}</dd>
                </dl>
              </Link>
            </li>
          ))}
      </ol>
    </div>
  );
}
