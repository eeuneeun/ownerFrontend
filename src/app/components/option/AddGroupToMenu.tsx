import { useAuthStore } from "@/app/_store/authStore";
import React, { useEffect, useState } from "react";

type Props = {
  nowMenuId: number;
};

type Group = {};

export default function AddGroupToMenu({ nowMenuId }: Props) {
  const { user, accessToken } = useAuthStore();
  const [groupArr, setGroupArr] = useState([]);

  async function getAllGroups() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/group`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setGroupArr(data);
  }

  async function addGroupsToMenu(nowMenuId: number, nowGroupId: number) {
    console.log(nowGroupId, nowMenuId);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/group`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuId: nowMenuId,
          groupId: nowGroupId,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    // setGroupArr(data);
  }

  useEffect(() => {
    getAllGroups();
  }, []);
  return (
    <div>
      <h3>메뉴에 옵션 그룹 추가</h3>
      {Array.isArray(groupArr) &&
        groupArr?.map((item, idx) => (
          <>
            <div key={item?.name + idx}>
              <div>{item?.name}</div>
              <div>{item?.desc}</div>
              <div>
                <h4>옵션</h4>
                {item?.groupOptions?.map((optionItem, idx) => (
                  <>
                    <ul key={optionItem.option.name + idx}>
                      <li>옵션명 : {optionItem.option.name}</li>
                      <li>옵션 설명 : {optionItem.option.desc}</li>
                      <li>
                        가격 : {Math.floor(Number(optionItem.option.price))}
                      </li>
                      <li>수량 : {optionItem.quantity}</li>
                    </ul>
                  </>
                ))}
              </div>
              <button onClick={() => addGroupsToMenu(nowMenuId, item.id)}>
                추가
              </button>
            </div>
          </>
        ))}
    </div>
  );
}
