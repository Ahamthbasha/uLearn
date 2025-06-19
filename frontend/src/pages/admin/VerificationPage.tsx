import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { type Column, type ActionButton } from "../../components/AdminComponents/DataTable";
import { Eye } from "lucide-react";
import { getAllVerificationRequests } from "../../api/action/AdminActionApi";

interface VerificationRequest {
  _id: string;
  username: string;
  email: string;
  status: string;
  resumeUrl: string;
  degreeCertificateUrl: string;
  reviewedAt?: Date;
}

const VerificationPage = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(1); // Change to any number you prefer per page

  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getAllVerificationRequests(page, limit, search);
      setRequests(res?.data || []);
      setTotalPages(res?.totalPages || 1);
    } catch (err) {
      console.error("Error fetching verification requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, search]); // Re-fetch on page or search change

  const columns: Column<VerificationRequest>[] = [
    { key: "username", title: "Name" },
    { key: "email", title: "Email" },
    { key: "status", title: "Status" },
  ];

  const actions: ActionButton<VerificationRequest>[] = [
    {
      key: "view",
      label: "View Details",
      icon: <Eye size={16} />,
      onClick: (record) => {
        navigate(`/admin/verificationDetail/${record.email}`);
      },
    },
  ];

  return (
    <DataTable
      title="Verification Requests"
      description="List of instructor verification requests."
      data={requests}
      loading={loading}
      columns={columns}
      actions={actions}
      pagination={{
        currentPage: page,
        totalPages: totalPages,
        onPageChange: (newPage) => setPage(newPage),
      }}
      searchValue={search}
      onSearchChange={(value) => {
        setSearch(value);
        setPage(1); // reset to page 1 on search
      }}
      searchPlaceholder="Search by name or email..."
    />
  );
};

export default VerificationPage;
