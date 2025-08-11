"use client";

import React, { useState } from "react";

type Props = {};

export default function Order({}: Props) {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const [activeTab, setActiveTab] = useState("all");
  return (
    <div className="order">
      <h2>주문내역</h2>

      <ul className="tab">
        <li
          className={`tab-btn ${activeTab == "all" && "active"}`}
          onClick={() => setActiveTab("all")}
        >
          전체
        </li>
        <li
          className={`tab-btn ${activeTab == "cook" && "active"}`}
          onClick={() => setActiveTab("cook")}
        >
          조리중
        </li>
        <li
          className={`tab-btn ${activeTab == "delivery" && "active"}`}
          onClick={() => setActiveTab("delivery")}
        >
          배달중
        </li>
        <li
          className={`tab-btn ${activeTab == "complete" && "active"}`}
          onClick={() => setActiveTab("complete")}
        >
          완료
        </li>
        <li
          className={`tab-btn ${activeTab == "reject" && "active"}`}
          onClick={() => setActiveTab("reject")}
        >
          주문거절
        </li>
      </ul>
      <ol>
        {list.map((item, idx) => (
          <li className="flex-center" key={item + idx}>
            <img src="/combi.jpg" alt="기본 토스트" />
            <dl>
              <dt>기본 토스트</dt>
              <dd>
                <span>3000원</span>X<span>1개</span> =<span>3000원</span>
              </dd>
              <dd>2025년 7월 30일 10:10</dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}
