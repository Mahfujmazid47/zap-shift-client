import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { FaUserShield, FaSearch } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const ManageUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${user.email}`);
            setFilteredUsers(res.data);
            return res.data;
        },
    });

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = users.filter(
            (user) =>
                user.name?.toLowerCase().includes(value) ||
                user.district?.toLowerCase().includes(value) ||
                user.region?.toLowerCase().includes(value)
        );

        setFilteredUsers(filtered);
    };

    const handleRoleChange = async (id, currentRole) => {
        const targetRole = currentRole === 'admin' ? 'user' : 'admin';

        const result = await Swal.fire({
            title: `Change role to ${targetRole}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: `Yes, make ${targetRole}`,
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/users/${id}/role`, { role: targetRole });
                if (res.data?.result?.modifiedCount > 0) {
                    Swal.fire("Success", `Role updated to ${targetRole}`, 'success');
                    refetch();
                }
            } catch (err) {
                Swal.fire("Error", "Role change failed", "error");
            }
        }
    };


    if (isLoading) return <Loading />;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by name, district, or region"
                    className="input input-bordered w-full max-w-sm"
                />
                <FaSearch className="text-xl" />
            </div>

            {filteredUsers.length === 0 ? (
                <p className="text-red-500">No users found with the search term.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Region</th>
                                <th>District</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.region}</td>
                                    <td>{user.district}</td>
                                    <td>{user.role || "user"}</td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${user.role === 'admin' ? 'btn-warning' : 'btn-success'}`}
                                            onClick={() => handleRoleChange(user._id, user.role)}
                                        >
                                            {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
