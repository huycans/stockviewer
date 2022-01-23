import React from "react";

export type TableDataProp = {
  name: string;
  value: null | string | number;
};

export type InfoTableProp = {
  tableData: TableDataProp[];
};

export default function InfoTable({tableData}: InfoTableProp) {
  return (
    <table>
      <tbody>
        {tableData.map((data) => (
          <tr key={data.name}>
            <td className="fieldName">{data.name}</td>
            <td className="fieldValue">
              {data.value === null ? "N/A" : data.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
