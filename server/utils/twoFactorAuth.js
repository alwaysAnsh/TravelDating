// import request from 'request'
// import express from 'express'



// const baseURL = "https://cpaas.messagecentral.com";
// const customerId = "C-55C7D5DCB0B4430";
// const email = "anshj9y@gmail.com";
// const password = "Anshjain@123";



// let verificationId;

// export const generateAuthToken = async () => {
//     const base64String = Buffer.from(password).toString("base64");

//     const url = `${baseURL}/auth/v1/authentication/token?country=IN&customerId=${customerId}&email=${email}&key=${base64String}&scope=NEW`;

//     const options = {
//         url: url,
//         headers: {
//             accept: "*/*",
//         },
//     };

//     return new Promise((resolve, reject) => {
//         request(options, (error, response, body) => {
//             if (error) {
//                 console.error("Error generating auth token:", error);
//                 reject(error);
//                 return;
//             }

//             console.log("Auth Token:", body);
//             const authToken = JSON.parse(body).token;

//             resolve(authToken);
//         });
//     });
// };

// export const sendOtp = async (authToken, countryCode, mobileNumber) => {
//     const url = `${baseURL}/verification/v2/verification/send?countryCode=${countryCode}&customerId=${customerId}&flowType=SMS&mobileNumber=${mobileNumber}`;

//     const options = {
//         url: url,
//         method: "POST",
//         json: true,
//         headers: {
//             accept: "*/*",
//             authToken: authToken,
//         },
//     };

//     return new Promise((resolve, reject) => {
//         request(options, (error, response, body) => {
//             if (error) {
//                 console.error("Error sending OTP:", error);
//                 reject(error);
//                 return;
//             }
//             console.log("Request:", options);
//             console.log("Body:", body);
//             verificationId = body.data.verificationId;
//             resolve(body);
//         });
//     });
// };

// export const validateOtp = async (authToken, otpCode, countryCode, mobileNumber) => {
//     const url = `${baseURL}/verification/v2/verification/validateOtp?countryCode=${countryCode}&mobileNumber=${mobileNumber}&verificationId=${verificationId}&customerId=${customerId}&code=${otpCode}`;

//     const options = {
//         url: url,
//         method: "GET",
//         json: true,
//         headers: {
//             accept: "*/*",
//             authToken: authToken,
//         },
//     };

//     return new Promise((resolve, reject) => {
//         request(options, (error, response, body) => {
//             if (error) {
//                 console.error("Error validating OTP:", error);
//                 reject(error);
//                 return;
//             }
//             console.log("Request inside verification:", options);
//             console.log("Body inside verification:", body);

//             resolve(body);
//         });
//     });
// };






