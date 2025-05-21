import OTPInput from '../../components/OTPInput';
import StudentLayout from '../../layouts/StudentLayout';

const MentorOTP = () => {
  const handleOtpSubmit = (otp: string) => {
    console.log('Submitted OTP:', otp);
    // Call your verification API here
  };

  return (
    <StudentLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Enter the OTP sent to your email
        </h2>
        <OTPInput length={4} onSubmit={handleOtpSubmit} />
      </div>
    </StudentLayout>
  );
};

export default MentorOTP;
