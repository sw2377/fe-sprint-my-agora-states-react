import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";

function Form({ onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  // 🔥 여러개의 input 상태 관리하기
  const [inputs, setInputs] = useState({
    name: "",
    title: "",
    description: "",
  });
  const { name, title, description } = inputs;

  const openCloseForm = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const resetForm = () => {
    setInputs({
      name: "",
      title: "",
      description: "",
    })
  }

  const inputChangeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
      // 🔥 [] 계산된 프로퍼티 
    })
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newDiscussion = {
      id: String(new Date().getTime()),
      createdAt: new Date().toISOString(),
      title: title,
      url: "#",
      author: name,
      answer: null,
      bodyHTML: description,
      avatarUrl: "image.png",
    }

    // console.log("FORM SUBMITTED", newDiscussion);

    resetForm();
    openCloseForm();

    onSubmit(newDiscussion); // App.js의 onSubmit
  }

  return (
    <>
      <section className="form__container">
        <div className="form__create">
          <button className="textBtn" onClick={openCloseForm}>
            <FontAwesomeIcon icon={faComment} />
            { isOpen ? "닫기" : "새 포스트" }
          </button>
        </div>
        <form
          action=""
          method="post"
          className={isOpen ? "form" : "form close"}
          onSubmit={formSubmitHandler}
        >
          <div className="form__input--wrapper">
            <div className="form__input--name">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={name}
                required
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form__input--title">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter your title"
                value={title}
                required
                onChange={inputChangeHandler}
              />
            </div>
            <div className="form__textbox">
              <textarea
                id="story"
                name="description"
                placeholder="Description"
                value={description}
                required
                onChange={inputChangeHandler}
              ></textarea>
            </div>
          </div>
          <div className="form__submit">
            <button className="textBtn">등록하기</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Form;
