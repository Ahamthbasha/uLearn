export const AdminErrorMessages = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_INCORRECT: "Incorrect email.",
  PASSWORD_INCORRECT: "Incorrect password.",
  ADMIN_CREATION_FAILED: "Failed to create admin account.",
  ADMIN_DATA_ERROR: "Error processing admin data.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
};
export const AdminSuccessMessages = {
  LOGIN_SUCCESS: "Welcome Admin",
  LOGOUT_SUCCESS: "Logout successful.",
  ADMIN_CREATED: "Admin account created successfully.",
  ADMIN_DATA_RETRIEVED: "Admin data retrieved successfully.",
};
export const InstructorSuccessMessages = {
  SIGNUP_SUCCESS: "Signup successful, OTP sent to email.",
  OTP_SENT: "OTP has been sent to your email successfully!",
  USER_CREATED: "User created successfully!",
  LOGIN_SUCCESS: "User logged in successfully!",
  LOGOUT_SUCCESS: "Logout successful!",
  PASSWORD_RESET: "Password changed successfully!",
  EMAIL_VERIFIED: "Email verified successfully!",
  TOKEN_VERIFIED: "Token verified successfully!",
  GOOGLE_LOGIN_SUCCESS: "Google login successful!",
  REDIERCTING_OTP_PAGE:"Rediercting To OTP Page",
  REDIERCTING_PASSWORD_RESET_PAGE:"Redirecting to Reset Password Page",
};
export const InstructorErrorMessages = {
  USER_ALREADY_EXISTS: "User already exists. Please log in instead.",
  USER_NOT_FOUND: "No user found with this email.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  INCORRECT_OTP: "Incorrect OTP.",
  EMAIL_VERIFICATION_FAILED: "Email verification failed.",
  TOKEN_INVALID: "Invalid or expired token.",
  PASSWORD_RESET_FAILED: "Password reset failed.",
  GOOGLE_LOGIN_FAILED: "Google login failed.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
};

export const StudentErrorMessages = {
  USER_ALREADY_EXISTS: "User already exists. Please log in instead.",
  USER_NOT_FOUND: "No user found with this email.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  INCORRECT_OTP: "Incorrect OTP.",
  EMAIL_VERIFICATION_FAILED: "Email verification failed.",
  TOKEN_INVALID: "Invalid or expired token.",
  PASSWORD_RESET_FAILED: "Password reset failed.",
  GOOGLE_LOGIN_FAILED: "Google login failed.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
};

export const StudentSuccessMessages = {
  SIGNUP_SUCCESS: "Signup successful, OTP sent to email.",
  OTP_SENT: "OTP has been sent to your email successfully!",
  USER_CREATED: "User created successfully!",
  LOGIN_SUCCESS: "User logged in successfully!",
  LOGOUT_SUCCESS: "Logout successful!",
  PASSWORD_RESET: "Password changed successfully!",
  EMAIL_VERIFIED: "Email verified successfully!",
  TOKEN_VERIFIED: "Token verified successfully!",
  GOOGLE_LOGIN_SUCCESS: "Google login successful!",
  REDIERCTING_OTP_PAGE:"Rediercting To OTP Page",
  REDIERCTING_PASSWORD_RESET_PAGE:"Redirecting to Reset Password Page",
};

export const OtpResponses={
  NO_OTP_DATA:"Retry again Failed To Login!"
}

export const AuthErrorMsg = {
    NO_ACCESS_TOKEN: "Unauthorized access. Please provide a valid token.",
    NO_REFRESH_TOKEN: "Unauthorized access. Session verification required.",
    INVALID_ACCESS_TOKEN: "Unauthorized access. Please authenticate again.",
    INVALID_REFRESH_TOKEN: "Session verification failed. Please log in again.",
    ACCESS_TOKEN_EXPIRED: "Session expired. Refreshing authentication...",
    REFRESH_TOKEN_EXPIRED: "Session expired. Please log in again.",
    AUTHENTICATION_FAILED: "Authentication failed. Please try again later.",
    PERMISSION_DENIED: "You do not have permission to perform this action.",
    ACCESS_FORBIDDEN: "You do not have permission to perform this action.",
    TOKEN_EXPIRED_NAME:'TokenExpiredError'
};

export const GeneralServerErrorMsg = {
    INTERNAL_SERVER_ERROR: "Internal server error!",
    DATABASE_ERROR: "Database operation failed!",
    OPERATION_FAILED: "Operation could not be completed!",
    UNEXPECTED_ERROR: "An unexpected error occurred!",
  };
  

export const JwtErrorMsg = {
  JWT_NOT_FOUND: "JWT not found in the cookies",
  INVALID_JWT: "Invalid JWT",
  JWT_EXPIRATION: "1h" as const,
  JWT_REFRESH_EXPIRATION: "6h" as const,
};
export const EnvErrorMsg = {
    CONST_ENV: "",
    JWT_NOT_FOUND: "JWT secret not found in the env",
    NOT_FOUND: "Env not found",
    ADMIN_NOT_FOUND: "Environment variables for admin credentials not found",
};
  
