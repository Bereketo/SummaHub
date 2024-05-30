import React, { useMemo, useState } from "react";
import styles from "./admin.module.css";
import DataTable from "react-data-table-component";
import Mock_Data from "./components/mock_data.json";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { Columns } from "./components/columns";
import GlobalFilter from "./components/GlobalFilter";
import AdminSidebar from "./components/admin_sidebar/admin_sidebar";

function Admin() {
  const [data1, setData] = useState(Mock_Data);
  const columns = useMemo(
    () => [
      ...Columns,
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.index)}>Delete</button>
        ),
      },
    ],
    []
  );
  const handleDelete = (rowIndex) => {
    setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
  };
  const data = useMemo(() => Mock_Data, []);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;
  const { globalFilter } = state;
  return (
    <div className={styles.admin_wrapper}>
      <div className={styles.admin_header}>
        <img src="./images/logo.png" alt="logo" width={70} height={45} />
        <div className={styles.account_detail}>
          <h1>👤Yonas Alemu</h1>
        </div>
      </div>
      <hr></hr>
      <div className={styles.admin_body}>
        <div className={styles.admin_sidemenu}>
       <AdminSidebar />
        </div>
        <div className={styles.vertical_line}></div>
        <div className={styles.user_display}>
          <div className={styles.user_listtitle}>
          <h1> Manage users</h1>
            <GlobalFilter
              className={styles.user_search}
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          </div>
          <div className={styles.user_list}>
            <></>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <strong>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "⬆️"
                              : "⬇️"
                            : ""}
                        </strong>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {" "}
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
