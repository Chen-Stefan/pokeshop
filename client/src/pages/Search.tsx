import React from "react";

export default function Search() {
  const handleFilterByType = () => {};

  const handleFilterByRegion = () => {};

  const handleSearchByName = () => {};

  return (
    <>
      <div className="filter__container justify-content-center">
        <div className="filter__items">
          <div>Type</div>
          <select
            value="{this.props.valuetype}"
            onChange={handleFilterByType}
          ></select>
        </div>

        <div className="filter__items">
          <div>Region</div>
          <select
            value="{this.props.valueregion}"
            onChange={handleFilterByRegion}
          ></select>
        </div>

        <div className="filter__items">
          <label>Search by name</label>
          <input
            type="text"
            value=""
            onChange={handleSearchByName}
          />
        </div>
      </div>
    </>
  );
}
