import { useEffect, useState } from 'react';
import { Pencil, ShieldX, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTable, { type Column, type ActionButton } from '../../../components/AdminComponents/DataTable';
import { getAllCategories, toggleCategoryStatus } from '../../../api/action/AdminActionApi';

const AdminCategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(1);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllCategories(currentPage, limit, searchTerm);
      setCategories(response.data || []);
      setTotalPages(response.totalPages || 1);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage, searchTerm]);

  const handleToggle = async (record: any) => {
    try {
      await toggleCategoryStatus(record._id);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = () => {
    navigate('/admin/addCategory');
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns: Column[] = [
    { key: 'categoryName', title: 'Category Name' },
    { key: 'isListed', title: 'Listed', render: (value) => (value ? 'Yes' : 'No') },
  ];

  const actions: ActionButton[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <Pencil size={16} />,
      onClick: (record) => navigate(`/admin/category/edit/${record._id}`),
    },
    {
      key: 'toggle',
      label: (record) => (record.isListed ? 'Unlist' : 'List'),
      icon: (record) => (record.isListed ? <ShieldX size={16} /> : <ShieldCheck size={16} />),
      onClick: handleToggle,
      className: (record) =>
        record.isListed
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-green-500 hover:bg-green-600 text-white',
    },
  ];

  return (
    <DataTable
      title="Categories"
      description="View, edit, or toggle category status."
      data={categories}
      columns={columns}
      actions={actions}
      loading={loading}
      error={error}
      onRetry={fetchCategories}
      searchValue={searchTerm}
      onSearchChange={handleSearchChange}
      pagination={{
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
      }}
      leftSideHeaderContent={
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Category
        </button>
      }
    />
  );
};

export default AdminCategoryListPage;
