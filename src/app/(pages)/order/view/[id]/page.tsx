"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OrderListItem } from "@/app/page";
type Props = {};

export default function OrderView({}: Props) {
  const params = useParams(); // { id: "123" }
  const { id } = params;
  const [data, setData] = useState<OrderListItem>({
    createdAt: "",
    customerId: "",
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
    deliveryMethod: "",
    id: 0,
    orderMenus: [
      {
        id: 0,
        menu: {
          category: "",
          create_at: "",
          desc: "",
          id: 0,
          imgUrl: "",
          name: "",
          price: 0,
        },
        quantity: 0,
        totalPrice: 0,
      },
    ],
    paymentMethod: "card",
    status: "COMPLETED",
    storeId: 1,
    totalPrice: 2500,
    updatedAt: "2025-08-17T12:43:25.243Z",
  });

  const getOrder = async () => {
    const response = await fetch(`http://localhost:4000/order/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    // const tmp = {
    //   createdAt: "2025-08-17T12:43:25.243Z",
    //   customerId: "qwer",
    //   customerName: "김길동",
    //   customerPhone: "01099999999",
    //   deliveryAddress: "ㅁ",
    //   deliveryMethod: "pickup",
    //   id: 12,
    //   orderMenus: [],
    //   paymentMethod: "card",
    //   status: "COMPLETED",
    //   storeId: 1,
    //   totalPrice: 2500,
    //   updatedAt: "2025-08-17T12:43:25.243Z",
    // };
    setData(data);
  };

  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div>
      <h3>{id} 주문내역</h3>
      <ul>
        <li>주문번호 : {data.id}</li>
        <li>주문자 : {data.customerName}</li>
        <li>연락처 : {data.customerPhone}</li>
        <li>수령방법 : {data.deliveryMethod}</li>
        <li>수령주소 : {data.deliveryAddress}</li>
        <li>결제수단 : {data.paymentMethod}</li>
        <li>총 결제액 : {data.totalPrice}</li>
        <li>
          <ol>
            {data.orderMenus.map((item, idx) => {
              return (
                <>
                  <li>메뉴명 : {item.menu.name}</li>
                  <li>가격 : {item.menu.price}</li>
                  <li>수량 : {item.quantity}</li>
                </>
              );
            })}
          </ol>
        </li>
      </ul>
    </div>
  );
}
