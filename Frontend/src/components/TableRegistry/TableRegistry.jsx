import React from "react";
import "./TableRegistry.css";

const TableRegistry = ({ gifts }) => {
  return (
    <>
      <table style={{ marginTop: "30px" }}>
        <thead>
          <tr className="registryTableTr">
            <th scope="col">Gift Name</th>
            <th scope="col">Link</th>
            <th scope="col">Status</th>
            <th scope="col">Bought By</th>
          </tr>
        </thead>
        <tbody>
          {gifts.map((gift, index) => (
            <tr key={index}>
              <td data-label="Gift Name">{gift.name}</td>
              <td data-label="Link">
                <a
                  className="a-table"
                  href={gift.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Gift
                </a>
              </td>
              <td data-label="Status">{gift.status}</td>
              <td data-label="Bought By">{gift.boughtBy ? gift.boughtBy.name : 'none'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableRegistry;
