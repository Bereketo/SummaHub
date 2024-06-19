import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrashUser = () => {
    const [trashs, setTrash] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchTrashUsers = async () => {
            try {
                const userToken = JSON.parse(localStorage.getItem('user'));
                const { token } = userToken;
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`http://localhost:4040/api/v1/users/trashedUsers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.data)
                setTrash(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                console.error('Error fetching trashed users:', err);
            }
        };

        fetchTrashUsers();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRestore = async (userId) => {
        try {
            const userToken = JSON.parse(localStorage.getItem('user'));
            const { token } = userToken;
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.patch(`http://localhost:4040/api/v1/users/restoreUser/${userId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // User restored successfully, update the UI
                setTrash(trashs.filter(user => user._id !== userId));
                console.log('User restored successfully');

                // Optionally, fetch trashed users again to update the list
            } else {
                console.error('Failed to restore user');
            }
        } catch (err) {
            console.error('Error restoring user:', err);
        }
    };

    return (
        <>
            <h1>Trashed Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trashs.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleRestore(user._id)}>Restore</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div>
                    {[...Array(totalPages).keys()].map((page) => (
                        <button key={page + 1} onClick={() => handlePageChange(page + 1)}>
                            {page + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export default TrashUser;
