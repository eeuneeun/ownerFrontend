import { useAuthStore } from "@/app/_store/authStore";
import React, { useEffect, useState } from "react";

type Props = {
  nowMenuId: number;
};

export default function AddGroupToMenu({ nowMenuId }: Props) {
  const { user, accessToken } = useAuthStore();
  const [groupArr, setGroupArr] = useState([]);

  async function getAllGroups() {
    const response = await fetch(`http://localhost:4030/group`, {
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

  async function addGroupsToMenu() {
    const response = await fetch(`http://localhost:4030/group`, {
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

  useEffect(() => {
    getAllGroups();
  }, []);
  return (
    <div>
      <h3>메뉴에 옵션 그룹 추가</h3>
      {Array.isArray(groupArr) &&
        groupArr?.map((item, idx) => (
          <>
            <div>{item?.name}</div>
            <div>{item?.desc}</div>
            <div>
              <h4>옵션</h4>
              {item?.groupOptions?.map((optionItem, idx) => (
                <>
                  <ul>
                    <li>옵션명 : {optionItem.option.name}</li>
                    <li>옵션 설명 : {optionItem.option.desc}</li>
                    <li>가격 : {optionItem.option.price}</li>
                    <li>수량 : {optionItem.quantity}</li>
                  </ul>
                </>
              ))}
            </div>
          </>
        ))}
    </div>
  );
}
