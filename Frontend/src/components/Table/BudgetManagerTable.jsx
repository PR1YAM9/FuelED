import React from "react";

export default function BudgetManagerTable({ data }) {
  return (
    <table>
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
            <td data-label="Transaction To">{item["Transaction To"]}</td>
            <td data-label="Amount">{item.Amount}</td>
            <td data-label="Status">{item.Status}</td>
            <td data-label="Date">{item.Date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
