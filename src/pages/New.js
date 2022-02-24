import React, { useEffect } from "react";

import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 다이어리 - 새로운 일기 기록하기`;
  }, []);

  return (
    <div className="New">
      <DiaryEditor headText={"새로운 일기 쓰기"}></DiaryEditor>
    </div>
  );
};

export default New;
