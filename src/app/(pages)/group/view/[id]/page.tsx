"use client";
import { useAuthStore } from "@/app/_store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

type Props = {};

type FormValues = {
  options: { value: string }[];
};
export default function GroupView({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("id");
  const { user, accessToken } = useAuthStore();

  const [groupData, setGroupData] = useState({
    name: "",
    desc: "",
  });

  const [optionList, setOptionList] = useState([]);
  const [selects, setSelects] = useState<number[]>([0]); // 기본으로 1개 select

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      options: [{ value: "" }], // 기본 1개
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  // 현 페이지의 그룹 정보 가져오기
  async function getNowGroup() {
    const id = Number(groupId);
    const response = await fetch(`http://localhost:4030/group/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setGroupData(data);
  }

  // 모든 옵션 리스트 정보 가져오기
  const getAllOptionList = async () => {
    const id = Number(groupId);
    const response = await fetch(`http://localhost:4030/option`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setOptionList(data);
  };

  const onSubmit = async (data: FormValues) => {
    console.log("제출된 데이터:", data);

    const reqData = await data.options.map((item, idx) => {
      return Number(item.value);
    });
    console.log(reqData);
    addOptionToGroup(reqData);
  };

  const addOptionToGroup = async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/group/options`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: Number(groupId),
          options: data,
        }),
      }
    );
    if (res.status == 200) {
      router.push("../");
    }
  };

  useEffect(() => {
    getNowGroup();
    getAllOptionList();
  }, [groupId]);

  return (
    <div className="group edit">
      <h3>그룹 편집</h3>

      <div>
        <dl>
          <dt>그룹명 </dt>
          <dd>{groupData?.name}</dd>
        </dl>
        <dl>
          <dt>그룹 설명 </dt>
          <dd>{groupData?.desc}</dd>
        </dl>

        <ul>
          {groupData?.groupOptions?.map((item, idx) => (
            <>
              <li>
                {item.option.name} / {item.option.price} /{item.quantity}
              </li>
            </>
          ))}
        </ul>

        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, idx) => (
            <Controller
              name={`options.${idx}.value`}
              control={control}
              render={({ field }) => (
                <>
                  <div className="select-wrap">
                    <select {...field}>
                      <option value="">옵션을 선택하세요</option>
                      {Array.isArray(optionList) &&
                        optionList?.map((item, idx) => (
                          <option value={item.id} key={item.id + idx}>
                            {item.name} / {item.price}
                          </option>
                        ))}
                    </select>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => remove(idx)}
                    >
                      X
                    </button>
                  </div>
                </>
              )}
            />
          ))}

          <button
            type="button"
            className="add-btn"
            onClick={() => append({ value: "" })}
          >
            + 추가
          </button>

          <button type="submit" className="submit-btn">
            제출
          </button>
        </form>
      </div>
    </div>
  );
}
