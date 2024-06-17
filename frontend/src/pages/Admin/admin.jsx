import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import styles from "./admin.module.css";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { Columns } from "./components/columns";  // Ensure this path is correct
import GlobalFilter from "./components/GlobalFilter";
import AdminSidebar from "./components/admin_sidebar/admin_sidebar";  // Ensure this path is correct

function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem('user'));
        const { token } = userToken;
        const response = await axios.get('http://localhost:4040/api/v1/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = async (rowIndex) => {
    const userToDelete = data[rowIndex];
    const userToken = JSON.parse(localStorage.getItem('user'));
    const { token } = userToken;
    try {
      await axios.delete(`http://localhost:4040/api/v1/users/${userToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((_, index) => index !== rowIndex));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

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
    [handleDelete]
  );

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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className={styles.admin_wrapper}>
      <div className={styles.admin_header}>
        <img src="./images/logo.png" alt="logo" width={70} height={45} />
        <div className={styles.account_detail}>
          <h1>👤Yonas Alemu</h1>
        </div>
      </div>
      <div className={styles.admin_body}>
        <div className={styles.admin_sidemenu}>
          <AdminSidebar />
        </div>
        <div className={styles.user_display}>
          <div className={styles.user_listtitle}>
            <h1>Manage users</h1>
            <GlobalFilter
              className={styles.user_search}
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          </div>
          <div className={styles.user_list}>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render("Header")}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ⬇️"
                            : " ⬆️"
                          : ""}
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
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
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
