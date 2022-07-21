import React from "react";
import "./table.scss";

export const Table = ({ data, onReset }) => {
  return (
    <table className="table">
      <thead>
        <tr className="table__row">
          <th className="table__field">Дата</th>
          <th className="table__field" onClick={onReset}>
            Название
          </th>
          <th className="table__field" onClick={onReset}>
            Количество
          </th>
          <th className="table__field" onClick={onReset}>
            Расстояние
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className="table__row" key={index}>
            <td className="table__field">{item.date}</td>
            <td className="table__field">{item.name} </td>
            <td className="table__field">{item.quantity} </td>
            <td className="table__field">{item.distance} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
