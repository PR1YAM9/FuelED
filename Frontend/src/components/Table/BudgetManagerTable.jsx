import React from "react";

export default function BudgetManagerTable({ data }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <table style={{ margin: 8 }}>
      <thead>
        <tr>
          <th scope="col">Transaction To</th>
          <th scope="col">Amount</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td data-label="Transaction To">{item.transactionTo}</td>
            <td data-label="Amount">{item.amount}</td>
            <td data-label="Status">{item.status}</td>
            <td data-label="Date">
              {item.date ? formatDate(item.date) : ""}
            </td>{" "}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
