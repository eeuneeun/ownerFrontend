import Link from "next/link";
import React from "react";

type Props = {};

export default function Nav({}: Props) {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/store">store</Link>
        </li>
        <li>
          <Link href="/menu">menu</Link>
        </li>
        <li>
          <Link href="/option">option</Link>
        </li>
        <li>
          <Link href="/order">order</Link>
        </li>
      </ul>
    </div>
  );
}
