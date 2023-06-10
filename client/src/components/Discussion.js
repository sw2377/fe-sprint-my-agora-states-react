import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";


function Discussion({ discussions, onRemove }) {  

  const convertToCreateDate = (time) => {
    const createdDate = new Date(time);
    const year = createdDate.getFullYear();
    const month = createdDate.getMonth() + 1;
    const date = createdDate.getDate();
    const hour = createdDate.getHours();
    const minutes = createdDate.getMinutes();
    
    let amPm;
    
    if ( hour > 12 ) {
      amPm = `PM ${hour - 12}`;
    } else {
      amPm = `AM ${hour}`;
    }

    return `${year}.${month}.${date} ${amPm}:${minutes}`;
  }

  return (
    <>
      { discussions.map((el) => (
        <li className="discussion__container" id={el.id} key={el.id}>
          <div className="discussion__avatar--wrapper">
            <img
              className="discussion__avatar--image"
              src={el.avatarUrl}
              alt="avatar"
            />
          </div>
          <div className="discussion__content">
            <h2 className="discussion__title">{el.title}</h2>
            <div className="discussion__information">
              <span className="discussion__author">{el.author}</span>
              <span className="discussion__date">{convertToCreateDate(el.createdAt)}</span>
            </div>
          </div>
          <div className="discussion__answered">
            <p className={ el.answer === null ? "inprogress" : "complete" }>
              { el.answer === null ? "답변대기" : "답변완료" }
            </p>
          </div>
          <div className="discussion__delete">
            <button onClick={() => { onRemove(el.id) }}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </li>
      )) }
    </>
  )
}

export default Discussion