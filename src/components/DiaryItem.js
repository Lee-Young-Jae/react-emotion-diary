import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ data }) => {
  const strDay = new Date(parseInt(data.date)).toLocaleDateString();
  const navigate = useNavigate();
  return (
    <div className="DiaryItem">
      <div
        onClick={() => navigate(`/diary/${data.id}`)}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${data.emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${data.emotion}.png`}
          alt={process.env.PUBLIC_URL + `assets/emotion${data.emotion}.png`}
        ></img>
      </div>
      <div
        className="info_wrapper"
        onClick={() => navigate(`/diary/${data.id}`)}
      >
        <div className="diary_date">{strDay}</div>
        <div className="diary_content_preview">{data.content.slice(0, 25)}</div>
      </div>
      <MyButton
        text="수정하기"
        onClick={() => navigate(`/edit/${data.id}`)}
      ></MyButton>
    </div>
  );
};

export default DiaryItem;
