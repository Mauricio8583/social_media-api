import express from 'express'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.listen(4000, () => {
    console.log('listening on port 4000')
});

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/users", userRoutes )
app.use("/api/auth", authRoutes )