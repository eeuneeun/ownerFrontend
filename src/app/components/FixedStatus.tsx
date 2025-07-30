import Link from "next/link";
import React from "react";

type Props = {};

export default function FixedStatus({}: Props) {
  return (
    <ul className="fixed-status">
      <li>
        <Link href="/">
          <span>주문현황</span>
          <span className="count">20</span>
        </Link>
      </li>
      <li>
        <Link href="/">
          <span>조리중</span>
          <span className="count">10</span>
        </Link>
      </li>
      <li>
        <Link href="/">
          <span>배달중</span>
          <span className="count">5</span>
        </Link>
      </li>
      <li>
        <Link href="/">
          <span>완료건</span>
          <span className="count">30</span>
        </Link>
      </li>
    </ul>
  );
}
