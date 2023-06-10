function Header() {

  return (
    <>
      <header>
        <div className="header__inner">
          <h1>My Agora States</h1>
          <div className="theme__container">
            <input type="checkbox" id="chkbox" />
            <label htmlFor="chkbox">
              <i className="fa-solid fa-lg"></i>
              {/* <!-- <i className="fa-solid fa-sun fa-lg"></i> --> */}
            </label>
          </div>
        </div>
      </header>
    </>
  )

}

export default Header;