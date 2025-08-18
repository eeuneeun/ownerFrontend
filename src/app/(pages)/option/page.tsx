"use client";

import { useAuthStore } from "@/app/_store/authStore";
import OptionGroups from "@/app/components/option/OptionGroups";
import OptionItems from "@/app/components/option/OptionItems";
import { Pagination } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
type Opition = {
  id: number;
  name: string;
  desc: string;
  imgUrl: string;
  price: number;
};
export default function Toast() {
  const [list, setList] = useState<Opition[]>([
    {
      id: 1,
      name: "피클",
      desc: "새콤하고 맛있는 피클",
      imgUrl: "/banner01.png",
      price: 500,
    },
  ]);
  const { user, accessToken } = useAuthStore();
  const [activeTab, setActiveTab] = useState("option");

  // 데이터 불러오기
  async function getOptionList() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/options`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // setList(data);
  }

  useEffect(() => {
    getOptionList();
  }, [accessToken]);

  return (
    <>
      <div className="toast">
        <h2>옵션 관리</h2>

        <div className="toast-wrap">
          <div className="flex-center">
            <button
              className={`tab-btn ${activeTab == "option" ? "active" : ""}`}
              onClick={() => setActiveTab("option")}
            >
              옵션 관리
            </button>
            <button
              className={`tab-btn ${activeTab == "group" ? "active" : ""}`}
              onClick={() => setActiveTab("group")}
            >
              옵션 그룹 관리
            </button>
          </div>
          <div>
            <OptionItems activetab={activeTab} />
            <OptionGroups activetab={activeTab} />
          </div>
        </div>
      </div>
    </>
  );
}
