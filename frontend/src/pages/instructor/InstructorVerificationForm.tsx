import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/common/InputField";
import { sendVerification } from "../../api/action/InstructorActionApi";
import { toast } from "react-toastify";

const InstructorVerificationForm: React.FC = () => {
  const initialValues = {
    name: "",
    email: "",
    degreeCertificate: null,
    resume: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    degreeCertificate: Yup.mixed().required("Degree Certificate is required"),
    resume: Yup.mixed().required("Resume is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      if (values.degreeCertificate) {
        formData.append("degreeCertificate", values.degreeCertificate);
      }
      if (values.resume) {
        formData.append("resume", values.resume);
      }

      const response = await sendVerification(formData);

      if (response) {
        toast.success("Verification request submitted successfully");
      }
    } catch (error) {
      toast.error("Error submitting verification request");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-8 mt-8 bg-white rounded shadow">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Instructor Verification
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <InputField
              type="text"
              name="name"
              label="Name"
              placeholder="Enter your name"
            />

            <div className="mt-4">
              <InputField
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="degreeCertificate"
                className="text-xs sm:text-sm font-semibold block mb-1"
              >
                Degree Certificate
              </label>
              <input
                type="file"
                name="degreeCertificate"
                accept=".pdf,.png,.jpg,.jpeg"
                className="text-sm"
                onChange={(e) => {
                  if (e.currentTarget.files?.[0]) {
                    setFieldValue("degreeCertificate", e.currentTarget.files[0]);
                  }
                }}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="resume"
                className="text-xs sm:text-sm font-semibold block mb-1"
              >
                Resume
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                className="text-sm"
                onChange={(e) => {
                  if (e.currentTarget.files?.[0]) {
                    setFieldValue("resume", e.currentTarget.files[0]);
                  }
                }}
              />
            </div>

            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
              >
                Submit Verification
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InstructorVerificationForm;
