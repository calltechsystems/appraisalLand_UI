const SearchBox = ({ setSearchInput }) => {
  return (
    <form className="d-flex flex-wrap align-items-center my-2">
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search Appraiser By Name"
        aria-label="Search"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <span className=" my-2 my-sm-0" disabled>
        <span className="flaticon-magnifying-glass"></span>
      </span>
    </form>
  );
};

export default SearchBox;
