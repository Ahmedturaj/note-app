"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationCodeTemplate = void 0;
const verificationCodeTemplate = (otp) => {
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 5 minutes.</p>
    </div>
  `;
};
exports.verificationCodeTemplate = verificationCodeTemplate;
