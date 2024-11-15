const mongoose = require('mongoose');
const url = "mongodb+srv://shashibhatt2306:Thugnomicss112@cluster0.stgmr.mongodb.net/Movies?retryWrites=true&w=majority&appName=Cluster0";
const express = require("express");
const core=require('cors');
const PORT='8000';
const app = express();

app.use(core())
app.use(express.json());
mongoose.connect(url).then(() => {
  app.listen(8000, () => {
    console.log(`Server is start at http://localhost:${PORT}`);
    console.log("MongoDB is connected successfully");
  });
}).catch((error) => {
  console.log("You have an error: " + error);
});

const Movieschema = new mongoose.Schema({
  id: { type: Number, required: true },
  movie: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  imdb_url: { type: String, required: true },
  description: { type: String, required: true },
  watch: { type: String, required: true }
});

const commentschema=new mongoose.Schema({
 comment:{type:String,required:true}
})

const MovieList = mongoose.model("MovieList", Movieschema, "MovieList");
const MovieComment=mongoose.model("MovieComment",commentschema,"MovieComment");
app.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalMovies = await MovieList.countDocuments();

    const movies = await MovieList.find()
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalMovies / limit);
    res.json({
      currentPage: page,
      totalPages: totalPages,
      totalMovies: totalMovies,
      movies: movies
    });

  } catch (error) {
    console.error("Error fetching movies: ", error);
    res.status(500).send("Error fetching movies");
  }
});
app.get('/comments', async (req, res) => {
  try {

      const comments = await MovieComment.find(); 
      
      return res.json(comments); 
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
});


app.post('/comments', async (req, res) => {
  try {
      const { comment } = req.body;
      if (!comment || comment.trim() === "") {
        return res.status(400).json({ message: "Please enter some comment" });
      }
      const newComment = new MovieComment({
        comment,
      });
  
      await newComment.save();
      MovieComment.deleteMany();
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
})

