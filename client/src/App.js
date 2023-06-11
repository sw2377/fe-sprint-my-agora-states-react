import { useState, useEffect } from 'react';
// import axios from 'axios';

import Header from './layout/Header';
import Nav from './layout/Nav';
import Form from './components/Form';
import Discussions from './components/Discussions';

import './App.css';

function App() {

  const serverUrl = "http://localhost:4000"
  const [discussions, setDiscussions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getDiscussion();
  }, []);

  const getDiscussion = () => {
     // axios
    //  axios(serverUrl + "/discussions")
    //  .then((res) => {
    //    setDiscussions(res.data);
    //  })
    // fetch
    fetch(serverUrl + "/discussions")
      .then((res) => res.json())
      .then((data) => setDiscussions(data))
  }

  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen)
  }

  const onCreate = (newDiscussion) => {

    /* 서버 요청 없을시 (클라이언트에서만 동작시)
    setDiscussions((prevDiscussion) => {
      return [newDiscussion, ...prevDiscussion]
    })
    */

    fetch(serverUrl + "/discussions/", {
      method: "POST", 
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDiscussion),
    }).then((res) => {
      if (res.status === 201) {
        console.log("CREATE 요청 성공", newDiscussion);
        getDiscussion();
      }
    })

  }

  const onUpdate = (targetId) => {
    console.log(`UPDATED. Target ID: ${targetId}`);
    openModalHandler()
  }
  
  const onRemove = (targetId) => {
    console.log(`REMOVE. Target ID: ${targetId}`);

    if (window.confirm("정말로 삭제하시겠습니까?")) {

      /* 서버 요청 없을시 (클라이언트에서만 동작시)
      const newList = discussions.filter (
        (list) => list.id !== targetId
      )
      setDiscussions(newList);
      */

      fetch(serverUrl + `/discussions/${targetId}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.status === 202) {
          getDiscussion();
        }
      })
    } 
  }

  return (
    <>
      <Header />
      <main>
        <Nav />
        <div className="contents__wrapper">
          <Form onSubmit={onCreate} />
          <Discussions discussions={discussions} onUpdate={onUpdate} onRemove={onRemove} modal={isModalOpen} />
        </div>
      </main>
    </>
  );
}

export default App;
