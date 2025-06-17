import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/common/InputField";
import { getProfile, updateProfile } from "../../api/action/StudentAction";
import Card from "../../components/common/Card";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProfileSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  skills: Yup.string(),
  expertise: Yup.string(),
  currentStatus: Yup.string(),
});

const StudentProfileEditPage = () => {
  const [initialValues, setInitialValues] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        if (response.success) {
          const profile = response.data;
          setInitialValues({
            username: profile.username || "",
            skills: profile.skills?.join(", ") || "",
            expertise: profile.expertise?.join(", ") || "",
            currentStatus: profile.currentStatus || "",
            profilePic: null,
          });
          if (profile.profilePicUrl) {
            setPreviewImage(profile.profilePicUrl);
          }
        }
      } catch (err) {
        console.error("Error loading profile", err);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("skills", JSON.stringify(values.skills.split(",").map((s: string) => s.trim())));
    formData.append("expertise", JSON.stringify(values.expertise.split(",").map((e: string) => e.trim())));
    formData.append("currentStatus", values.currentStatus);
    if (values.profilePic) {
      formData.append("profilePic", values.profilePic);
    }

    try {
      const response = await updateProfile(formData);
      if (response.success) {
        toast.success("Profile updated successfully");
        setTimeout(() => {
          navigate("/user/profile");
        }, 1500);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile", err);
      toast.error("Something went wrong");
    }
  };

  if (!initialValues) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 flex justify-center">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      <Card title="✏️ Edit Profile" className="max-w-xl w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              <InputField name="username" label="Username" type="text" placeholder="Enter username" />
              <InputField name="skills" label="Skills (comma separated)" type="text" placeholder="e.g. React, Node" />
              <InputField name="expertise" label="Expertise (comma separated)" type="text" placeholder="e.g. Full Stack" />
              <InputField name="currentStatus" label="Current Status" type="text" placeholder="e.g. Developer" />

              <div className="flex flex-col">
                <label className="mb-1 font-medium text-sm">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event: any) => {
                    setFieldValue("profilePic", event.currentTarget.files[0]);
                    const reader = new FileReader();
                    reader.onload = () => setPreviewImage(reader.result as string);
                    reader.readAsDataURL(event.currentTarget.files[0]);
                  }}
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-24 h-24 rounded-full mt-2 object-cover"
                  />
                )}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => navigate("/user/profile")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default StudentProfileEditPage;
