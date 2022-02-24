import React from "react";

const EmotionItem = ({ data, emotion, handleClickEmote, isSelected }) => {
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${data.emotion_id}` : "EmotionItem_off",
      ].join(" ")}
      onClick={handleClickEmote(data.emotion_id)}
    >
      <img src={data.emotion_img} alt={data.emotion_img}></img>
      <span>{data.emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
