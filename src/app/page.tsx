"use client";

import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="main flex-center">
      <ul>
        <li>
          <Link href="/pages/nomal">
            <dl>
              <dt>주문 번호 &nbsp;&nbsp;&nbsp;1230</dt>
              <dd>
                <span>주문시간 </span> <span>2025.07.27 오전 10:33</span>
              </dd>
              <dd>
                <span>메뉴</span> <span>삼선짬뽕 15000원 1개</span>
              </dd>
              <dd>
                <span>총 금액 </span> <span>15000원</span>
              </dd>
            </dl>
            <ul className="status">
              <li>
                <button className="ok">수락</button>
              </li>
              <li>
                <button className="no">거절</button>
              </li>
            </ul>
          </Link>
        </li>
      </ul>
    </div>
  );
}
