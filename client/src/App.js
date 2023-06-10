import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './layout/Header';
import Nav from './layout/Nav';
import Form from './components/Form';
import Discussions from './components/Discussions';

import './App.css';

function App() {

  const [discussions, setDiscussions] = useState([]);;

  useEffect(() => {
    // axios('http://localhost:4000/discussions')
    //   .then((res) => {
    //     setDiscussions(res.data);
    //   })
    fetch('http://localhost:4000/discussions')
      .then((res) => res.json())
      .then((data) => setDiscussions(data))
  }, []);

  const onSubmit = (newDiscussion) => {
    console.log("FormSubmitHandler", newDiscussion);
    // setDiscussions([newDiscussion, ...discussions]);
    setDiscussions((prevDiscussion) => {
      console.log("prev", prevDiscussion)
      return [newDiscussion, ...prevDiscussion]
    })
  }
  
  const onRemove = (targetId) => {
    console.log("REMOVE CLICKED", targetId);

    const newList = discussions.filter (
      (list) => list.id !== targetId
    )
    setDiscussions(newList);
  }

  return (
    <>
      <Header />
      <main>
        <Nav />
        <div className="contents__wrapper">
          <Form onSubmit={onSubmit} />
          <Discussions discussions={discussions} onRemove={onRemove} /> 
        </div>
      </main>
    </>
  );
}

export default App;
