// src/scripts/seed.js
import mongoose from "mongoose";
import User from "../models/User.js";
import Amiibo from "../models/Amiibo.js";

await mongoose.connect("mongodb://localhost:27018/amiibo_wiki_db");

await User.create({
  username: "admin",
  email: "admin@amiibo.com",
  password: "123456",
  role: "ADMIN"
});

await Amiibo.create({
  name: "Link",
  series: "The Legend of Zelda",
  releaseDate: "2014-12-06",
  imageUrl: "https://amiiboapi.com/images/icon_link.png"
});

console.log("✅ Banco e coleções criados com sucesso!");
process.exit();
