import React from "react";
import "./TableIndex.css";

export default function Table({ columns, data }) {
  const getKeyFromColumn = (column) => {
    switch (column.toLowerCase()) {
      case "s.no":
        return "sno";
      case "name":
        return "name";
      case "phone":
        return "phone";
      case "email":
        return "email";
      case "service type":
        return "serviceType";
      case "company name":
        return "companyName";
      case "+1":
        return "plusOne";
      default:
        return column.toLowerCase().replace(/ /g, "");
    }
  };

  return (
    <table className="custom-table">
      <thead className="custom-thead">
        <tr className="custom-tr">
          {columns.map((column, index) => (
            <th key={index} scope="col" className="custom-th">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="custom-tbody">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="custom-tr">
            {columns.map((column, colIndex) => (
              <td key={colIndex} data-label={column} className="custom-td">
                {row[getKeyFromColumn(column)]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
