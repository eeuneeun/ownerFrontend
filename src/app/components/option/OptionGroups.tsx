import React from "react";

type Props = { activetab: string };

export default function OptionGroups({ activetab }: Props) {
  return (
    <div className={`option ${activetab == "group" ? "active" : ""}`}>
      <h3> OptionGroups</h3>
      <ol className="toast-list">
        <li>
          <img
            src="http://localhost:3000/option_icons/pickle.svg"
            alt="기본 토스트"
          />
          <dl>
            <dt>피클</dt>
            <dd>500 원</dd>
            <dd>새콤달콤 맛있는 피클</dd>
          </dl>
        </li>
      </ol>
    </div>
  );
}
