import Discussion from "./Discussion";
import UpdateModal from "./UpdateModal";

function Discussions({ discussions, onUpdate, onRemove, modal, updateTitle }) {

  return (
    <>
     <section className="discussion__wrapper" style={{ height: `calc(100% - 34px)` }}>
        <ul className="discussions__container">
          <Discussion discussions={discussions} onUpdate={onUpdate} onRemove={onRemove} />
        </ul>
        {/* { modal ? <UpdateModal /> : null } */}
      </section>
    </>
  )

}

export default Discussions;