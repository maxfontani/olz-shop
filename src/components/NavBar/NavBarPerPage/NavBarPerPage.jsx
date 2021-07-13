const NavBarPerPage = ({ style, perPage, setPerPage }) => (
  <div className={style}>
    Товаров на странице:{" "}
    <select value={perPage} onChange={setPerPage}>
      {[10, 25, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          {pageSize}
        </option>
      ))}
    </select>
  </div>
);
export default NavBarPerPage;
