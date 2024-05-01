import React, { useState } from "react";

interface FilterComponentProps {
  onFilter: (filterValue: string) => void;
}

const UserFilterComponent: React.FC<FilterComponentProps> = ({ onFilter }) => {
  const storedFilterValue = localStorage.getItem("filterValue") || "lemoncode";
  const [filterValue, setFilterValue] = useState(storedFilterValue);
  

  const handleFilterClick = () => {
    onFilter(filterValue);
  };

  React.useEffect(() => {
    localStorage.setItem("filterValue", filterValue);
  }, [filterValue]);

  return (
    <div>
      <input
        type="text"
        placeholder="filter"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <button onClick={handleFilterClick}>Filter</button>
    </div>
  );
};

export default UserFilterComponent;