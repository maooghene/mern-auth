import express from "express"
import cors from "cors";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";


const app = express()
const port = process.env.PORT || 4000
connectDB();


const allowedOrigins = [
  "https://mern-auth-five-orpin.vercel.app", 
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


//API Endpoints
app.get('/', (req, res)=> res.send("API Working"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


app.listen(port, ()=> console.log(`server started on PORT:${port}`))