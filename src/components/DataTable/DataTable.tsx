import React, { useState } from "react";
import styles from "./data-table.module.scss";
import Link from "next/link";
import { Edit2, Trash } from "react-feather";

interface IDataTableProps {
  headers: string[];
  /**
   * @param ID needs to be the first item of the row
   */
  data: Array<Array<String>>;
  editPathname: string;
  editQueryParamName: string;
  deleteHandler: (id: string) => void;
}

enum ESortDirection {
  asc = "asc",
  desc = "desc",
}

const DataTable = ({
  headers,
  data,
  editPathname,
  editQueryParamName,
  deleteHandler,
}: IDataTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    colIndex: number;
    direction: ESortDirection;
  } | null>(null);

  const sortData = (colIndex: number) => {
    let direction: ESortDirection = ESortDirection.asc;
    if (
      sortConfig &&
      sortConfig.colIndex === colIndex &&
      sortConfig.direction === ESortDirection.asc
    ) {
      direction = ESortDirection.desc;
    }
    setSortConfig({ colIndex, direction });
  };

  const sortedData = data.slice().sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.colIndex];
    const bValue = b[sortConfig.colIndex];

    if (aValue < bValue) {
      return sortConfig.direction === ESortDirection.asc ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === ESortDirection.asc ? 1 : -1;
    }
    return 0;
  });

  return (
    <table className={styles.dataTable}>
      <thead>
        <tr>
          {headers.map((header, colIndex) => (
            <th
              key={colIndex}
              onClick={() => header !== "" && sortData(colIndex)}
              className={
                sortConfig?.colIndex === colIndex ? styles.activeSortHeader : ""
              }
            >
              {header}
              {sortConfig?.colIndex === colIndex && (
                <span
                  className={`${styles.sortIcon} ${
                    styles[sortConfig.direction]
                  }`}
                ></span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => {
          const formId = sortedData[rowIndex][0].toString();
          return (
            <tr key={rowIndex}>
              {row.map(
                (col, columnIndex) =>
                  columnIndex !== 0 && <td key={columnIndex}>{col}</td>
              )}
              <td>
                <div>
                  <Link
                    href={{
                      pathname: editPathname,
                      query: { [editQueryParamName]: formId },
                    }}
                  >
                    <Edit2 />
                  </Link>
                </div>
              </td>
              <td>
                <div onClick={() => deleteHandler(formId)}>
                  <Trash />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
