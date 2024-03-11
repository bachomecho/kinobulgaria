function Navigation() {
  return (
    <>
      <h2>
        <a href="/">
          <h2>Kino Bulgaria</h2>
        </a>
      </h2>
      <nav>
        <ul>
          <li>
            <a className="navigation" href="/">
              Начало
            </a>
            <a className="navigation" href="/about">
              За нас
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
