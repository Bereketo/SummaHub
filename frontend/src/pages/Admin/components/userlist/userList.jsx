import React from "react";
import styles from './useList.module.css'
const UserList = () => {
    return (
        <div className={styles.user_display}>
            <div className={styles.manage_user}>
                <h2>Manage Users</h2>
            </div>
            <div className={styles.user_listtitle}>
                <h3>User List</h3>
                <div className={styles.user_search}>
                    <input type="text" placeholder="🔍 Search user" />
                </div>
            </div>
            <div className={styles.user_list}>
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>john.doe@example.com</td>
                            <td>Admin</td>
                            <td>Active</td>
                            <td>Edit/Delete</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default UserList;