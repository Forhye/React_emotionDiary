import './App.css'
import { useReducer, useRef } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import New from './pages/New'
import Diary from './pages/Diary'
import Home from './pages/Home'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'

import Button from './components/Button'
import Header from './components/Header'

import { getEmotionImage } from './util/get-emition-image'

const mockData = [
  {
    id: 1,
    createDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createDate: new Date().getTime(),
    emotionId: 3,
    content: "3번 일기 내용",
  }
];


function reducer(state, action) {
  switch (action.type) {
    case 'CREATE': return [action.data, ...state];
    case 'UPDATE': return state.map((item) =>
      String(item.id) === String(action.data.id)
        ? action.data : item)
  }
}



//1. "/" : 모든 일기를 조회하는 Home 페이지
//2. "/new" : 새로운 일기를 작성하는 New 페이지
//3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef([4]);

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
      }
    })
  }

  // 기존 일기 수정
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      date: {
        id,
        createDate,
        emotionId,
        content,
      }
    })

  }


  // 기존 일기 삭제

  return (
    <>
      <Header title={"Header"}
        leftChild={<Button text={"Left"} />}
        rightChild={<Button text={"Right"} />}
      />

      <button onClick={() => {
        onCreate(new Date().getTime(), 1, "Hello");
      }}>
        일기추가 테스트</button>

      <button onClick={() => {
        onUpdate(1, new Date().getTime(), 3, "수정된 일기내용입니다")
      }}>일기 수정 테스트</button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
