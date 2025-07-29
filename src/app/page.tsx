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
              <dt>주문 번호 : 1230</dt>
              <dd>주문시간 : 2025.07.27 오전 10:33</dd>
              <dd>메뉴 : 삼선짬뽕 15000원 1개</dd>
              <dd>총 금액 : 15000원</dd>
            </dl>
            <ul>
              <li>
                <button className="ok">수락</button>
              </li>
              <li>
                <button className="no">거절</button>
              </li>
            </ul>
          </Link>
        </li>
        <li>
          <Link href="/pages/nomal">
            <dl>
              <dt>주문 번호 : 1230</dt>
              <dd>주문시간 : 2025.07.27 오전 10:33</dd>
              <dd>메뉴 : 삼선짬뽕 15000원 1개</dd>
              <dd>총 금액 : 15000원</dd>
            </dl>
            <ul>
              <li>
                <button className="ok">수락</button>
              </li>
              <li>
                <button className="no">거절</button>
              </li>
            </ul>
          </Link>
        </li>{" "}
        <li>
          <Link href="/pages/nomal">
            <dl>
              <dt>주문 번호 : 1230</dt>
              <dd>주문시간 : 2025.07.27 오전 10:33</dd>
              <dd>메뉴 : 삼선짬뽕 15000원 1개</dd>
              <dd>총 금액 : 15000원</dd>
            </dl>
            <ul>
              <li>
                <button className="ok">수락</button>
              </li>
              <li>
                <button className="no">거절</button>
              </li>
            </ul>
          </Link>
        </li>{" "}
        <li>
          <Link href="/pages/nomal">
            <dl>
              <dt>주문 번호 : 1230</dt>
              <dd>주문시간 : 2025.07.27 오전 10:33</dd>
              <dd>메뉴 : 삼선짬뽕 15000원 1개</dd>
              <dd>총 금액 : 15000원</dd>
            </dl>
            <ul>
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
