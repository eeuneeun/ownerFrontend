"use client";

import { useEffect, useState } from "react";
import FixedStatus from "./components/FixedStatus";
import Link from "next/link";
import DateCasting from "./components/DateCasting";
import { useRouter } from "next/navigation";

export type OrderListItem = {
  createdAt: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryMethod: string;
  id: number;
  orderMenus: [
    {
      id: number;
      menu: {
        category: string;
        create_at: string;
        desc: string;
        id: number;
        imgUrl: string;
        name: string;
        price: number;
      };
      quantity: number;
      totalPrice: number;
    }
  ];
  paymentMethod: string;
  status: string;
  storeId: number;
  totalPrice: number;
  updatedAt: string;
};

export default function Home() {
  const router = useRouter();
  const [orderArr, setOrderArr] = useState<OrderListItem[]>([]);

  async function getAllOrder() {
    const res = await fetch(`http://localhost:4000/order/store/${1}`);
    const result = await res.json();
    console.log(result);
    setOrderArr(result);
  }

  async function updateOrderStatus(orderId: number, nextStatus: string) {
    const res = await fetch(`http://localhost:4000/order/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: nextStatus,
      }),
    });
    const result = await res.json();
    console.log(result);
    if ((result.status = nextStatus)) {
      alert("상태가 변경되었습니다!");
      // router.refresh();
      window.location.reload();
    }
  }

  useEffect(() => {
    getAllOrder();
  }, []);
  return (
    <>
      <FixedStatus orderArr={orderArr} />
      <div className="main flex-center">
        <ul>
          {orderArr &&
            orderArr.length > 0 &&
            orderArr.map((item: OrderListItem, idx) => {
              const firstMenu = item?.orderMenus[0]?.menu?.name;
              console.log(firstMenu);

              return (
                <li key={item.createdAt + idx}>
                  <Link
                    href={{
                      pathname: `/order/view/${item.id}`,
                      query: { id: item.id, ref: "home" },
                    }}
                  >
                    <img src="/combi.jpg" alt="메뉴 이미지" />
                    <dl>
                      <dt>주문 번호 &nbsp;&nbsp;&nbsp;{item.id}</dt>
                      <dd>
                        <span>주문시간 </span>
                        <span>{DateCasting(item.createdAt)}</span>
                      </dd>
                      <dd>
                        <span>메뉴</span>
                        <span>
                          {firstMenu} 외 {item.orderMenus.length} 개
                        </span>
                      </dd>
                      <dd>
                        <span>총 금액 </span>
                        <span>{item.totalPrice}원</span>
                      </dd>
                    </dl>
                  </Link>
                  <ul className="status">
                    {item.status == "WAITING" ? (
                      <>
                        <li>
                          <button
                            className="ok"
                            onClick={() =>
                              updateOrderStatus(item.id, "IN_PROGRESS")
                            }
                          >
                            수락
                          </button>
                        </li>
                        <li>
                          <button
                            className="no"
                            onClick={() =>
                              updateOrderStatus(item.id, "CANCELED")
                            }
                          >
                            거절
                          </button>
                        </li>
                      </>
                    ) : item.status == "IN_PROGRESS" ? (
                      <>
                        <li>
                          <button
                            className="cook"
                            onClick={() =>
                              updateOrderStatus(item.id, "DELIVERY")
                            }
                          >
                            조리중
                          </button>
                        </li>
                      </>
                    ) : item.status == "DELIVERY" ? (
                      <li>
                        <button
                          className="delivery"
                          onClick={() =>
                            updateOrderStatus(item.id, "COMPLETED")
                          }
                        >
                          배달중
                        </button>
                      </li>
                    ) : item.status == "COMPLETED" ? (
                      <li>
                        <button className="completed">수령 완료</button>
                      </li>
                    ) : (
                      item.status == "CANCELED" && (
                        <li>
                          <button className="cancel">취소</button>
                        </li>
                      )
                    )}
                    <li></li>
                  </ul>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
