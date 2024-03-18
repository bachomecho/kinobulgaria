function Navigation() {
  return (
    <>
      <h2>
        <a href="/">Kino Bulgaria</a>
      </h2>
      <nav>
        <ul className="navigation-menu">
          <li>
            <a href="/">Начало</a>
            <a href="/about">За нас</a>
          </li>
        </ul>

        <div className="dropdown-menu">
          <button className="dropbtn">Меню</button>
          <div className="dropdown-content">
            <ul>
              <li>
                <a href="/">Начало</a>
              </li>
              <li>
                <a href="/about">За нас</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
