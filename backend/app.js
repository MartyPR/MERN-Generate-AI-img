//
import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
import { config, uploader } from "cloudinary";
import mongoose from    "mongoose";
 

const corsOption= {
    origin:'http://localhost:5173',
    credentials:true
}

dotenv.config();
const app = express();
const PORT = 9000;

mongoose.connect(process.env.MONGODB)
.then(()=>{console.log("database Connected")})
.catch((e)=>console.log(e))

//!gallery model
const gallerySchema= new mongoose.Schema({
    prompt:String,
    url:String,
    public_id:String,
},{
    timestamps:true,
})
const Gallery = mongoose.model("Gallery",gallerySchema)
//config openAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
//config
config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
//middlewares
app.use(express.json());
app.use(cors(corsOption))

//route
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;
  try {
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });
    //save image
    const image = await uploader.upload(imageResponse.data[0].url, {
      folder: "ai-art-work",
    });
    const imageCreated = await Gallery.create({
        prompt:imageResponse.data[0].revised_prompt,
        url:imageResponse.data[0].url,
        public_id:image.public_id,

    })

    console.log(image);
    res.json(imageResponse.data[0].url);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error generation image" });
  }
});

app.get('/images', async(req,res)=>{
try {
    const images= await Gallery.find();
    res.json(images);
} catch (error) {
    res.json({message:"Error fetching images"})
}
})

//start server
app.listen(PORT, console.log("Server is running..."));
