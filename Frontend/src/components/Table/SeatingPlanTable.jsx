import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Table.css";

function SearchableDropdown({ options, value, onChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setIsDropdownOpen(false);
    onChange(option);
  };

  const getFilteredOptions = () => {
    return options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="dropdown">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="dropbtn"
      >
        {value || "Select..."}
      </button>
      {isDropdownOpen && (
        <div id="myDropdown" className="dropdown-content show">
          <input
            type="text"
            placeholder="Search..."
            id="myInput"
            className="dropdown-search-input"
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={(e) => e.stopPropagation()}
          />
          {getFilteredOptions().map((option, index) => (
            <a key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SeatingPlanTable({
  numberOfColumns,
  numberOfRows,
  dropdownOptions,
  onTableChange,
}) {
  const columns = Array.from(
    { length: numberOfColumns },
    (_, index) => `Guest ${index + 1}`
  );

  const [selectedValues, setSelectedValues] = useState(
    Array.from({ length: numberOfRows }, () => Array(numberOfColumns).fill(""))
  );

  useEffect(() => {
    onTableChange(selectedValues);
  }, [selectedValues, onTableChange]);

  const handleDropdownChange = (value, rowIndex, colIndex) => {
    const updatedValues = selectedValues.map((row, rIndex) =>
      row.map((val, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? value : val
      )
    );
    setSelectedValues(updatedValues);
  };

  const getFilteredOptions = (colIndex, rowIndex) => {
    const selectedOptions = selectedValues.flat();
    return dropdownOptions.filter(
      (option) =>
        !selectedOptions.includes(option) ||
        option === selectedValues[rowIndex][colIndex]
    );
  };

  const handleRemoveUser = (rowIndex, colIndex) => {
    const updatedValues = [...selectedValues];
    updatedValues[rowIndex][colIndex] = "";
    setSelectedValues(updatedValues);
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} data-label={column}>
                <SearchableDropdown
                  options={getFilteredOptions(colIndex, rowIndex)}
                  value={selectedValues[rowIndex][colIndex]}
                  onChange={(value) =>
                    handleDropdownChange(value, rowIndex, colIndex)
                  }
                />
                {selectedValues[rowIndex][colIndex] && (
                  <div
                    onClick={() => handleRemoveUser(rowIndex, colIndex)}
                    style={{ paddingTop: "5px" }}
                  >
                    <CancelIcon />
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
