import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus, Trash2 } from "lucide-react";

import Card from "../../../components/common/Card";
import { Button } from "../../../components/common/Button";
import EntityTable from "../../../components/common/EntityTable";

import {
  getQuizByCourseId,
  deleteQuiz,
  deleteQuestionFromQuiz,
} from "../../../api/action/InstructorActionApi";

import { type IQuestion } from "../../../types/interfaces/IQuiz";

const QuizManagementPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<(IQuestion & { quizId: string })[]>([]);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    if (!courseId) return;

    try {
      setLoading(true);
      const response = await getQuizByCourseId(courseId);

      if (response?.questions?.length > 0) {
        setQuestions(response.questions);
        setQuizId(response.questions[0]?.quizId);
      } else {
        setQuestions([]);
        setQuizId(null);
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        setQuestions([]);
        setQuizId(null);
      } else {
        toast.error("Failed to load quiz");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId: string, quizId: string) => {
    try {
      await deleteQuestionFromQuiz(quizId, questionId);
      toast.success("Question deleted");
      fetchQuestions();
    } catch {
      toast.error("Failed to delete question");
    }
  };

  const handleDeleteQuiz = async () => {
    if (!quizId) return;
    try {
      await deleteQuiz(quizId);
      toast.success("Quiz deleted");
      fetchQuestions();
    } catch {
      toast.error("Failed to delete quiz");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [courseId]);

  return (
    <div className="px-4 py-6">
      <Card
        padded
        className="bg-white shadow-sm rounded-lg"
        header={
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold">Quiz Management</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {quizId ? (
                <>
                  <Button
                    onClick={() => navigate(`/instructor/course/${courseId}/quiz/add`)}
                    className="w-full sm:w-auto flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleDeleteQuiz}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Quiz
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate(`/instructor/course/${courseId}/quiz/add`)}
                  className="w-full sm:w-auto flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Quiz
                </Button>
              )}
            </div>
          </div>
        }
      >
        {loading ? (
          <p className="text-sm text-gray-600">Loading questions...</p>
        ) : quizId && questions.length > 0 ? (
          <EntityTable
            title="All Quiz Questions"
            data={questions}
            columns={[
              { key: "questionText", label: "Question" },
              { key: "correctAnswer", label: "Correct Answer" },
            ]}
            onEdit={(q) =>
              navigate(`/instructor/course/${courseId}/quiz/edit/${q.quizId}?questionId=${q._id}`)
            }
            onDelete={(q) => {
              if (q._id && q.quizId) handleDeleteQuestion(q._id, q.quizId);
            }}
            emptyText="No questions found"
          />
        ) : (
          <p className="text-sm text-gray-600">No quiz or questions found yet.</p>
        )}
      </Card>
    </div>
  );
};

export default QuizManagementPage;
