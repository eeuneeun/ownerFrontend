"use client";

import { useAuthStore } from "@/app/_store/authStore";
import OptionGroups from "@/app/components/option/OptionGroups";
import OptionItems from "@/app/components/option/OptionItems";
import { Pagination } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Toast() {
  const [activeTab, setActiveTab] = useState("option");

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
