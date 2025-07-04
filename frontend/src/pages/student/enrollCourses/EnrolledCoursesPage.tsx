// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getEnrolledCourses } from "../../../api/action/StudentAction";
// import { toast } from "react-toastify";

// interface Course {
//   _id: string;
//   courseName: string;
//   thumbnailUrl: string;
//   price: number;
// }

// interface Enrollment {
//   _id: string;
//   courseId: Course;
//   completionStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
// }

// const EnrolledCoursesPage = () => {
//   const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEnrolled = async () => {
//       try {
//         const response = await getEnrolledCourses();
//         console.log(response)
//         setEnrollments(response.courses); // courses from controller
//       } catch (error) {
//         toast.error("Failed to load enrolled courses");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEnrolled();
//   }, []);

//   if (loading) return <p className="p-6">Loading enrolled courses...</p>;

//   if (enrollments.length === 0)
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-xl font-semibold">No Enrolled Courses</h2>
//         <p className="text-gray-600">Browse and buy some courses to see them here.</p>
//       </div>
//     );

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">🎓 Your Enrolled Courses</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {enrollments.map((enroll) => {
//           const course = enroll.courseId;
//           return (
//             <div
//               key={enroll._id}
//               onClick={() => navigate(`/user/enrolled/${course._id}`)}
//               className="cursor-pointer bg-white border rounded-lg shadow hover:shadow-md transition duration-200"
//             >
//               <img
//                 src={course.thumbnailUrl}
//                 alt={course.courseName}
//                 className="h-40 w-full object-cover rounded-t-lg"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold">{course.courseName}</h3>
//                 <p className="text-sm text-gray-600 mb-2">Status: <span className="capitalize">{enroll.completionStatus.toLowerCase()}</span></p>
//                 <p className="text-right font-bold text-green-600">₹{course.price}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default EnrolledCoursesPage;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEnrolledCourses, getCertificate } from "../../../api/action/StudentAction";
import { toast } from "react-toastify";

interface Course {
  _id: string;
  courseName: string;
  thumbnailUrl: string;
  price: number;
}

interface Enrollment {
  _id: string;
  courseId: Course;
  completionStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  certificateGenerated: boolean;
}

const EnrolledCoursesPage = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const response = await getEnrolledCourses();
        console.log(response)
        setEnrollments(response.courses); // assuming response.courses = Enrollment[]
      } catch (error) {
        toast.error("Failed to load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolled();
  }, []);

  const handleDownloadCertificate = async (courseId: string) => {
    try {
      const response = await getCertificate(courseId);
      console.log(response)
      if (response.success && response.certificateUrl) {
        window.open(response.certificateUrl, "_blank");
      } else {
        toast.error(response.message || "Certificate not available yet");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to download certificate");
    }
  };

  if (loading) return <p className="p-6">Loading enrolled courses...</p>;

  if (enrollments.length === 0)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No Enrolled Courses</h2>
        <p className="text-gray-600">Browse and buy some courses to see them here.</p>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🎓 Your Enrolled Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((enroll) => {
          const course = enroll.courseId;
          return (
            <div
              key={enroll._id}
              onClick={() => navigate(`/user/enrolled/${course._id}`)}
              className="cursor-pointer bg-white border rounded-lg shadow hover:shadow-md transition duration-200 relative"
            >
              <img
                src={course.thumbnailUrl}
                alt={course.courseName}
                className="h-40 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{course.courseName}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Status:{" "}
                  <span className="capitalize">{enroll.completionStatus.toLowerCase()}</span>
                </p>
                <p className="text-right font-bold text-green-600">₹{course.price}</p>

                {enroll.certificateGenerated ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadCertificate(course._id);
                    }}
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    🎓 Download Certificate
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-2 bg-gray-300 text-gray-600 px-3 py-1 rounded text-sm cursor-not-allowed"
                  >
                    Certificate Not Ready
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledCoursesPage;
