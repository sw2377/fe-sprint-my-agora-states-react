import Discussion from "./Discussion";

function Discussions({ discussions, onRemove }) {


  return (
    <>
     <section className="discussion__wrapper" style={{ height: `calc(100% - 34px)` }}>
        <ul className="discussions__container">
          <Discussion discussions={discussions} onRemove={onRemove} />
        </ul>
      </section>
    </>
  )

}

export default Discussions;