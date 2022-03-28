import React from "react";

const Searcbar = (props) => {
  const { onSearch } = props;
  const [search, setSearch] = React.useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
    if(e.target.value.length === 0){
      onSearch(null)
    }
  };

  const onClick = async (e) => {
    onSearch(search);
  };

  return (
    <div className="searchBar-container">
      <div className="searchBar">
        <input onChange={onChange} placeholder="Buscar pokemon..." />
      </div>

      <div className="searchBar-btn"> 
        <button onClick={onClick}>Buscar</button>
      </div>

    </div>
  );
};
export default Searcbar;
