import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();

  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(a.createDate) - Number(b.createDate);
      } else {
        return Number(b.createDate) - Number(a.createDate);
      }
    });
  };
  // 원본 배열은 그대로 냅두고 정렬된 새로운 배열을 반환한다 toSorted()
  // js 정렬함수들은 사전순으로 값을 비교하기 때문에 객체로 받은 data의 값을 잘 이해하지 못한다.
  // 그래서 직접 비교함수를 넣어줘야한다

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("new")}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>

      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
