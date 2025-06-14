import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVerificationRequestByemail, updateVerificationStatus } from "../../api/action/AdminActionApi";
import { Button } from "../../components/common/Button"; // Adjust path if needed
import { Loader } from "lucide-react";

interface VerificationRequest {
  _id: string;
  username: string;
  email: string;
  status: string;
  resumeUrl: string;
  degreeCertificateUrl: string;
  reviewedAt?: Date;
}

const VerificationDetailsPage = () => {
  const { email } = useParams<{ email: string }>();
  const [request, setRequest] = useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchRequest = async () => {
    try {
      const res = await getVerificationRequestByemail(email!);
      setRequest(res?.data);
    } catch (err) {
      console.error("Error fetching request details", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: "approved" | "rejected") => {
    try {
      setUpdating(true);
      await updateVerificationStatus(email!, status);
      setRequest((prev) => prev ? { ...prev, status } : prev);
    } catch (err) {
      console.error("Error updating status", err);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [email]);

  if (loading) {
    return <div className="flex justify-center mt-10"><Loader className="animate-spin" /></div>;
  }

  if (!request) {
    return <div className="text-center text-red-500 mt-10">Request not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">Instructor Verification Details</h2>

      <div className="space-y-3">
        <div><strong>Name:</strong> {request.username}</div>
        <div><strong>Email:</strong> {request.email}</div>
        <div><strong>Status:</strong> <span className={`font-semibold ${request.status === "approved" ? "text-green-600" : request.status === "rejected" ? "text-red-600" : "text-yellow-600"}`}>{request.status}</span></div>
        <div><strong>Resume:</strong> <a href={request.resumeUrl} target="_blank" className="text-blue-600 underline">View Resume</a></div>
        <div><strong>Degree Certificate:</strong> <a href={request.degreeCertificateUrl} target="_blank" className="text-blue-600 underline">View Certificate</a></div>
        {request.reviewedAt && (
          <div><strong>Reviewed At:</strong> {new Date(request.reviewedAt).toLocaleString()}</div>
        )}
      </div>

      {request.status === "pending" && (
        <div className="mt-6 flex gap-4">
          <Button disabled={updating} onClick={() => handleStatusUpdate("approved")} className="bg-green-600 hover:bg-green-700">Approve</Button>
          <Button disabled={updating} onClick={() => handleStatusUpdate("rejected")} className="bg-red-600 hover:bg-red-700">Reject</Button>
        </div>
      )}
    </div>
  );
};

export default VerificationDetailsPage;
