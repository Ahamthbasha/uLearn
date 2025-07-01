import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courseDetail } from "../../../api/action/StudentAction";
import { toast } from "react-toastify";

interface CourseDetail {
  _id: string;
  courseName: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  thumbnailUrl: string;
  demoVideo: {
    type: "video";
    url: string;
  };
  category: {
    _id: string;
    categoryName: string;
  };
  instructorId: {
    _id: string;
    username: string;
  };
}

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [chapterCount, setChapterCount] = useState(0);
  const [quizQuestionCount, setQuizQuestionCount] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await courseDetail(courseId!);
        const { course, chapterCount, quizQuestionCount } = res.data;

        setCourse(course);
        setChapterCount(chapterCount);
        setQuizQuestionCount(quizQuestionCount);
      } catch (error) {
        toast.error("Failed to load course details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!course) return <div className="text-center py-10 text-red-500">Course not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans">
      {/* Course Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-8">
        {/* Thumbnail */}
        <div className="relative">
          <img
            src={course.thumbnailUrl}
            alt={course.courseName}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Course Info */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{course.courseName}</h2>
            <p className="text-gray-700 text-sm mt-2">{course.description}</p>

            <div className="grid grid-cols-2 gap-y-2 text-gray-800 text-sm mt-4">
              <p><strong>Instructor:</strong> {course.instructorId.username}</p>
              <p><strong>Category:</strong> {course.category.categoryName}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Level:</strong> {course.level}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <p><strong>Chapters:</strong> {chapterCount}</p>
              <p><strong>Quiz Questions:</strong> {quizQuestionCount}</p>
            </div>
          </div>

          <button
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow mt-6 w-fit"
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Demo Video */}
      {course.demoVideo?.url && (
        <div className="mt-14">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Watch Demo Video</h3>
          <video
            controls
            className="w-full rounded-xl shadow-md max-h-[500px] object-cover"
            src={course.demoVideo.url}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
