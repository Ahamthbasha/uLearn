
import {type FC } from "react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  thumbnailUrl: string;
  categoryName?: string;
}

const CourseCard: FC<CourseCardProps> = ({
  id,
  title,
  description,
  price,
  duration,
  level,
  thumbnailUrl,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border flex flex-col">
      {/* Image */}
      <div className="relative group h-48 overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>

        <div className="grid grid-cols-2 text-sm text-gray-700 gap-2 mb-4">
          <span>🕒 {duration} hrs</span>
          <span>🎯 {level}</span>
          <span>💰 ₹{price}</span>
        </div>

        <button
          onClick={() => navigate(`/user/course/${id}`)}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;


// interface Props {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   duration: string;
//   level: string;
//   thumbnailUrl: string;
//   categoryName?: string;
// }

// const CourseCard = ({
//   id,
//   title,
//   description,
//   price,
//   duration,
//   level,
//   thumbnailUrl,
//   categoryName,
// }: Props) => {
//   return (
//     <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition relative group">
//       <div className="relative mb-4">
//         <img src={thumbnailUrl} alt={title} className="w-full h-48 object-cover rounded-md" />
//         <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
//           Hot
//         </span>
//       </div>

//       <p className="text-sm text-gray-500">{categoryName}</p>
//       <h3 className="font-semibold text-lg">{title}</h3>

//       <div className="text-sm text-gray-600 truncate">{description}</div>

//       <div className="flex items-center gap-2 mt-2">
//         <span className="text-green-700 font-semibold text-md">₹{price}</span>
        
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
