import React from "react";
import "./Table.css";
export default function Table() {
  const columns = ["Account", "Due Date", "Amount", "Period"];

  const data = [
    {
      account: "Visa - 3412",
      duedate: "04/01/2016",
      amount: "$1,190",
      period: "03/01/2016 - 03/31/2016",
    },
    {
      account: "Visa - 6076",
      duedate: "03/01/2016",
      amount: "$2,443",
      period: "02/01/2016 - 02/29/2016",
    },
    {
      account: "Corporate AMEX",
      duedate: "03/01/2016",
      amount: "$1,181",
      period: "02/01/2016 - 02/29/2016",
    },
    {
      account: "Visa - 3412",
      duedate: "02/01/2016",
      amount: "$842",
      period: "01/01/2016 - 01/31/2016",
    },
  ];
  return (
    <table>
      <caption>Statement Summary</caption>
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
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} data-label={column}>
                {row[column.toLowerCase().replace(/ /g, "")]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
