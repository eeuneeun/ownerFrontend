import Link from "next/link";
import React, { useEffect, useState } from "react";
import { OrderListItem } from "../page";

type ChildProps = {
  orderArr: OrderListItem[];
};

export default function FixedStatus({ orderArr }: ChildProps) {
  const [inprogress, setInprogress] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function countStatus() {
    let tmpInprogress = inprogress;
    let tmpDelivery = delivery;
    let tmpCompleted = completed;

    await orderArr.map((item, idx) => {
      if (item.status == "IN_PROGRESS") {
        tmpInprogress = tmpInprogress + 1;
      } else if (item.status == "DELIVERY") {
        tmpDelivery = tmpDelivery + 1;
      } else if (item.status == "COMPLETED") {
        tmpCompleted = tmpCompleted + 1;
      }
    });

    setInprogress(tmpInprogress);
    setDelivery(tmpDelivery);
    setCompleted(tmpCompleted);
  }
  useEffect(() => {
    countStatus();
  }, [orderArr]);
  return (
    <ul className="fixed-status">
      <li>
        <Link href="/">
          <span>주문현황</span>
          <span className="count">{orderArr.length}</span>
        </Link>
      </li>
      <li>
        <Link href="/">
          <span>조리중</span>
          <span className="count">{inprogress}</span>
        </Link>
      </li>
      <li>
        <Link href="/">
          <span>배달중</span>
          <span className="count">{delivery}</span>
        </Link>
      </li>
      <li>
        <Link href="/">
          <span>완료건</span>
          <span className="count">{completed}</span>
        </Link>
      </li>
    </ul>
  );
}
