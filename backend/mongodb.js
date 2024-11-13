const mongoose = require('mongoose');
const url = "mongodb+srv://shashibhatt2306:Thugnomicss112@cluster0.stgmr.mongodb.net/Movies?retryWrites=true&w=majority&appName=Cluster0";
const express = require("express");
// const fs = require('fs');
// const path = require('path');
const core=require('cors');
const PORT='8000';
const app = express();

app.use(core())
mongoose.connect(url).then(() => {
  app.listen(8000, () => {
    console.log(`Server is start at http://localhost:${PORT}`);
    console.log("MongoDB is connected successfully");
  });
}).catch((error) => {
  console.log("You have an error: " + error);
});

const schema = new mongoose.Schema({
  id: { type: Number, required: true },
  movie: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  imdb_url: { type: String, required: true },
  description: { type: String, required: true },
  watch: { type: String, required: true }
});


const MovieList = mongoose.model("MovieList", schema, "MovieList");
// const filePath = path.join(__dirname, 'api.json');
// const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// MovieList.insertMany(data)
//   .then(() => {
//     // console.log("Documents are inserted successfully");
//   })
//   .catch((error) => {
//     console.log("Error in inserting documents: ", error);
//   });
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
