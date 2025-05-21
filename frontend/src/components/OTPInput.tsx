import React, { useState, useRef } from 'react';
import otpImage from '../assets/otp.jpg'
interface OTPInputProps {
  length?: number;
  onSubmit: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onSubmit }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === length) {
      onSubmit(otpValue);
    } else {
      alert('Please fill all OTP fields.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-10">
      
      {/* Left: Illustration */}
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <div className="p-4 bg-white rounded-3xl shadow-xl w-full max-w-sm">
          <img
            src={otpImage} // Replace with your path
            alt="OTP Verification Illustration"
            className="w-full object-contain rounded-2xl"
          />
        </div>
      </div>

      {/* Right: OTP Form */}
      <div className="w-full md:w-1/2 bg-white px-6 py-10 rounded-3xl shadow-xl max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          OTP Verification
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We’ve sent a code to your email. Please enter it below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Didn't receive the code? <span className="text-blue-600 cursor-pointer hover:underline">Resend</span>
        </p>
      </div>
    </div>
  );
};

export default OTPInput;
