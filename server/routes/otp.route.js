// import express from 'express'
// import { generateAuthToken, sendOtp, validateOtp } from '../utils/twoFactorAuth.js';
// const router = express.Router();

// router.post("/sendotp/:countryCode/:mobileNumber", async (req, res) => {
//     const { countryCode, mobileNumber } = req.params;

//     try {
//         const authToken = await generateAuthToken();
//         const body = await sendOtp(authToken, countryCode, mobileNumber);

//         if (body.data.responseCode === '200' && body.data.errorMessage === null) {
//             res.status(200).send("OTP sent successfully!");
//         } else {
//             res.status(400).send(`Bad Request: ${body.data.errorMessage}`);
//         }
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         res.status(500).send(error);
//     }
// });

// router.get(
//     "/validateOtp/:countryCode/:mobileNumber/:otpCode",
//     async (req, res) => {
//         console.log("validate api hit")
//         const { countryCode, mobileNumber, otpCode } = req.params;

//         try {
//         console.log("validate api hit2")

//             const authToken = await generateAuthToken();
//             const body = await validateOtp(authToken, otpCode, countryCode, mobileNumber);

//         console.log("validate api hit3")

//             if (
//                 body.data.verificationStatus === "VERIFICATION_COMPLETED" &&
//                 body.data.errorMessage === null
//             ) {
//                 res.status(200).send("OTP verification done!");
//             } else {
//                 res.status(400).send(`Bad Request: ${body.data.errorMessage}`);
//             }
//         } catch (error) {
//             console.error("Error verifying OTP:", error);
//             res.status(500).send(error);
//         }
//     }
// );
// export default router