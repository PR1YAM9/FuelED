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
            <td data-label="Transaction To">{item.transactionTo}</td>
            <td data-label="Amount">{item.amount}</td>
            <td data-label="Status">{item.status}</td>
            <td data-label="Date">{item.date ? item.date.toString() : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
