import React, { useEffect, useState, useCallback } from 'react';
import { UserX, UserCheck, Users } from 'lucide-react';
import DataTable, { type Column, type ActionButton } from '../../components/AdminComponents/DataTable';
import { getAllUser, blockUser } from '../../api/action/AdminActionApi';
import { toast } from 'react-toastify';

interface User {
  id: string;
  username: string;
  email: string;
  status: 'Blocked' | 'Active';
  created: string;
  isBlocked: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await getAllUser();
      
      if (!userData || !Array.isArray(userData)) {
        throw new Error('Invalid user data received');
      }
      
      // Fixed: Properly type the user data and ensure status is correctly typed
      const formattedUsers: User[] = userData.map((user: any) => ({
        id: user._id,
        username: user.username || 'N/A',
        email: user.email || 'N/A',
        status: (user.isBlocked ? 'Blocked' : 'Active') as 'Blocked' | 'Active', // Explicit type assertion
        created: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : 'N/A',
        isBlocked: user.isBlocked || false,
      }));
      
      setUsers(formattedUsers);
    } catch (error: any) {
      const errorMessage = error.message || "Failed to fetch users";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleBlockToggle = useCallback(async (user: User) => {
    try {
      const response = await blockUser(user.email);
      if (response.success) {
        toast.success(response.message);
        setUsers((prev) =>
          prev.map((u) =>
            u.email === user.email
              ? { 
                  ...u, 
                  status: (u.status === 'Blocked' ? 'Active' : 'Blocked') as 'Blocked' | 'Active',
                  isBlocked: !u.isBlocked 
                }
              : u
          )
        );
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred while blocking user');
    }
  }, []);

  // Define columns for users
  const columns: Column<User>[] = [
    {
      key: 'username',
      title: 'Name',
      render: (value) => <div className="text-sm font-medium text-gray-900">{value}</div>
    },
    {
      key: 'email',
      title: 'Email',
      render: (value) => <div className="text-sm text-gray-900">{value}</div>
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
            value === 'Blocked'
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {value}
        </span>
      )
    },
    {
      key: 'created',
      title: 'Created',
      render: (value) => <span className="text-sm text-gray-900">{value}</span>
    }
  ];

  // Fixed: Define actions with proper function signatures
  const actions: ActionButton<User>[] = [
    {
      key: 'block-toggle',
      label: (user: User) => user.status === 'Blocked' ? 'Unblock User' : 'Block User',
      icon: (user: User) => user.status === 'Blocked' ? <UserX size={16} /> : <UserCheck size={16} />,
      onClick: handleBlockToggle,
      className: (user: User) => user.status === 'Blocked'
        ? 'bg-red-500 hover:bg-red-600 text-white'
        : 'bg-green-500 hover:bg-green-600 text-white'
    }
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      actions={actions}
      loading={loading}
      error={error}
      title="User List"
      description="Manage and monitor all registered users"
      searchPlaceholder="Search by name or email"
      searchableFields={['username', 'email']}
      onRetry={fetchUsers}
      emptyStateIcon={<Users size={48} className="text-gray-300" />}
      emptyStateTitle="No users available"
      emptyStateDescription="No users have been registered yet."
    />
  );
};

export default UserList;