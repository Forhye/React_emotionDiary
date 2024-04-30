import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import New from "./pages/New";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

import Button from "./components/Button";
import Header from "./components/Header";

import { getEmotionImage } from "./util/get-emition-image";

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

//1. "/" : 모든 일기를 조회하는 Home 페이지
//2. "/new" : 새로운 일기를 작성하는 New 페이지
//3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // localStorage.setItem("test", "hello");
  // localStorage.setItem("person", JSON.stringify({ name: "김현준" }));

  // console.log(localStorage.getItem("test"));
  // console.log(JSON.parse(localStorage.getItem("person")));
  //JSON.parse 인수로 전달한 값이 undefined나 null이면 오류남

  // localStorage.removeItem("test");
  // 로컬 스토리지 삭제

  // 새로운 일기 추가
  const onCreate = (createDate, emotionId, content) => {
    //새로운 일기를 추가하는 기능

    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다.</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
