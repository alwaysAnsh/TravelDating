import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './database/database.js'
import userRoutes from './routes/user.route.js'
import tripRoutes from './routes/trip.route.js'
import request from 'request'
// import otpRoutes from './routes/otp.route.js'

dotenv.config();

const app = express();

db();

//middleware
app.use(express.json());


const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: '*'
}))


const baseURL = "https://cpaas.messagecentral.com";
const customerId = "C-55C7D5DCB0B4430";
const email = "anshj9y@gmail.com";
const password = "Anshjain@123";



const verificationStore = {};

export const generateAuthToken = async () => {
    const base64String = Buffer.from(password).toString("base64");

    const url = `${baseURL}/auth/v1/authentication/token?country=IN&customerId=${customerId}&email=${email}&key=${base64String}&scope=NEW`;

    const options = {
        url: url,
        headers: {
            accept: "*/*",
        },
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                console.error("Error generating auth token:", error);
                reject(error);
                return;
            }

            console.log("Auth Token:", body);
            const authToken = JSON.parse(body).token;

            resolve(authToken);
        });
    });
};

export const sendOtp = async (authToken, countryCode, mobileNumber) => {
    const url = `${baseURL}/verification/v2/verification/send?countryCode=${countryCode}&customerId=${customerId}&flowType=SMS&mobileNumber=${mobileNumber}`;

    const options = {
        url: url,
        method: "POST",
        json: true,
        headers: {
            accept: "*/*",
            authToken: authToken,
        },
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                console.error("Error sending OTP:", error);
                reject(error);
                return;
            }
            console.log("Request:", options);
            console.log("Body:", body);
            verificationId = body.data.verificationId;
            resolve(body);
        });
    });
};

export const validateOtp = async (authToken, otpCode, countryCode, mobileNumber, verificationId) => {
    const url = `${baseURL}/verification/v2/verification/validateOtp?countryCode=${countryCode}&mobileNumber=${mobileNumber}&verificationId=${verificationId}&customerId=${customerId}&code=${otpCode}`;

    const options = {
        url: url,
        method: "GET",
        json: true,
        headers: {
            accept: "*/*",
            authToken: authToken,
        },
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                console.error("Error validating OTP:", error);
                reject(error);
                return;
            }
            console.log("Request inside verification:", options);
            console.log("Body inside verification:", body);

            resolve(body);
        });
    });
};
app.post("/sendotp/:countryCode/:mobileNumber", async (req, res) => {
    const { countryCode, mobileNumber } = req.params;

    try {
        const authToken = await generateAuthToken();
        const body = await sendOtp(authToken, countryCode, mobileNumber);

        if (body.data.responseCode === '200' && body.data.errorMessage === null) {
            verificationStore[mobileNumber] = body.data.verificationId;
            res.status(200).send("OTP sent successfully!");
        } else {
            res.status(400).send(`Bad Request: ${body.data.errorMessage}`);
        }
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).send(error);
    }
});

app.get(
    "/validateOtp/:countryCode/:mobileNumber/:otpCode",
    async (req, res) => {
        console.log("validate api hit")
        const { countryCode, mobileNumber, otpCode } = req.params;

        try {
        console.log("validate api hit2")

            const authToken = await generateAuthToken();
            const verificationId = verificationStore[mobileNumber];
            const body = await validateOtp(authToken, otpCode, countryCode, mobileNumber, verificationId);

        console.log("validate api hit3")

            if (
                body.data.verificationStatus === "VERIFICATION_COMPLETED" &&
                body.data.errorMessage === null
            ) {
                res.status(200).send("OTP verification done!");
            } else {
                res.status(400).send(`Bad Request: ${body.data.errorMessage}`);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            res.status(500).send(error);
        }
    }
);








app.use('/api/v1', userRoutes)
app.use('/api/v1', tripRoutes)
// app.use('/api/v1', otpRoutes)


app.get('/', (req,res) => res.send("this is homepage for backend server. Hellooooo"))

app.listen(PORT,() => 
{
    console.log("this is backend working seamlessly AT PORT : ", PORT)
})