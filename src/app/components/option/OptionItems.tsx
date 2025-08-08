import React from "react";

type Props = { activetab: string };

export default function OptionItems({ activetab }: Props) {
  return (
    <div className={`option ${activetab == "option" ? "active" : ""}`}>
      <h3>OptionItems</h3>
      <div className="btn-wrap">
        <button>옵션 추가</button>
      </div>
      <ol className="toast-list">
        <li>
          <img src="http://localhost:3000/option_icons/pickle.png" alt="피클" />
          <dl>
            <dt>피클</dt>
            <dd>500 원</dd>
            <dd>새콤달콤 맛있는 피클</dd>
          </dl>
          <div className="btn-wrap">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </li>
        <li>
          <img
            src="http://localhost:3000/option_icons/letuce.png"
            alt="양상추"
          />
          <dl>
            <dt>양상추</dt>
            <dd>500 원</dd>
            <dd>아삭아삭 맛있는 양상추</dd>
          </dl>
          <div className="btn-wrap">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </li>
        <li>
          <img src="http://localhost:3000/option_icons/egg.png" alt="달걀" />
          <dl>
            <dt>계란 후라이</dt>
            <dd>500 원</dd>
            <dd>바삭하고 고소한 맛있는 계란 후라이</dd>
          </dl>
          <div className="btn-wrap">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </li>
      </ol>
    </div>
  );
}
