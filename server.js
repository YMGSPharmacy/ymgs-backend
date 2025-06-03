import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import addressRouter from './routes/addressRoute.js'
import contactRouter from './routes/contactRoutes.js'
import uploadImageRoute from './routes/uploadImageRoute.js'
import blogRouter from './routes/blogRoute.js'
import apicache from 'apicache'

//App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
const cache = apicache.middleware;

//middleware
app.use(express.json())
const allowedOrigins = ['https://www.ymgspharmacy.com', 'https://ymgspharmacy.com', 'https://admin.ymgspharmacy.com', 'http://localhost:5174', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // credentials: true, // if you're using cookies/auth headers
}));
app.options('*', cors());
app.use(cache('2 minutes'));

// ✅ Global CORS Response Headers Middleware


//api-end points
app.get("/", (req, res) => {
  res.status(200).send("YMGS pharmacy Backend");
});
app.use('/api/user', userRouter)
app.use('/api/product', cache('10 minutes'), productRouter)
app.use('/api/cart', cache('10 minutes'), cartRouter)
app.use('/api/order', cache('10 minutes'), orderRouter)
app.use('/api/address', addressRouter)
app.use('/api/contact', contactRouter)
app.use('/api/upload-image', cache('10 minutes'), uploadImageRoute)
app.use('/api/blog', blogRouter)

app.listen(port, () => console.log('Server started on PORT : ' + port))