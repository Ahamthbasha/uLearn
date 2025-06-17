import { useEffect, useState } from "react";
import { getProfile } from "../../api/action/StudentAction";
import Card from "../../components/common/Card";

const StudentProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        if (response.success) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-6 flex justify-center">
      <Card
        title="👤 Student Profile"
        className="max-w-xl w-full"
        footer={
          <div className="flex justify-center">
            <button
              onClick={() => window.location.href = "/user/editProfile"}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center mb-4">
          {profile.profilePicUrl ? (
            <img
              src={profile.profilePicUrl}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover mb-2 shadow"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
              No Image
            </div>
          )}
        </div>

        <div className="space-y-2 text-sm sm:text-base">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Skills:</strong> {profile.skills?.join(", ") || "None"}</p>
          <p><strong>Expertise:</strong> {profile.expertise?.join(", ") || "None"}</p>
          <p><strong>Status:</strong> {profile.currentStatus || "N/A"}</p>
        </div>
      </Card>
    </div>
  );
};

export default StudentProfilePage;
