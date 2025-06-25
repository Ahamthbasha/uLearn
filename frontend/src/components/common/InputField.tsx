import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Eye, EyeOff } from "lucide-react"; // or use react-icons if preferred

interface InputfieldProps {
  type?: string;
  placeholder?: string;
  name: string;
  label: string;
  disabled?: boolean;
}

const InputField: React.FC<InputfieldProps> = ({
  type = "text",
  placeholder = "",
  name,
  label,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <>
      <label
        htmlFor={name}
        className="block text-gray-800 text-xs sm:text-sm font-semibold mb-1"
      >
        {label.toUpperCase()}
      </label>
      <div className="relative flex flex-col">
        
        <Field
          className={`w-full px-3 sm:px-5 py-2 sm:py-3 rounded-lg ${type === "number" ? "no-arrows" : ""} font-medium border-2 border-transparent text-black text-xs sm:text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100`}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          id={name}
          name={name}
          disabled={disabled}
        />

        {isPassword && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2/4 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
      </div>
      <ErrorMessage
        className="text-xs sm:text-sm font-semibold text-red-500 mt-1 ml-2 sm:ml-3"
        name={name}
        component="span"
      />
    </>
  );
};

export default InputField;
