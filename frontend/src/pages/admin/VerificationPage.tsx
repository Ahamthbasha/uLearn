import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/AdminComponents/DataTable";
import type { Column, ActionButton } from "../../components/AdminComponents/DataTable";
import { Eye } from "lucide-react";
import { getAllVerificationRequests } from "../../api/action/AdminActionApi"; // ✅ updated

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
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getAllVerificationRequests(); // ✅ updated
      setRequests(res?.data || []); // ✅ adjusted to match your backend response shape
    } catch (err) {
      console.error("Error fetching verification requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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
      itemsPerPage={5}
      searchPlaceholder="Search by name or email..."
      searchableFields={["username", "email"]}
    />
  );
};

export default VerificationPage;
