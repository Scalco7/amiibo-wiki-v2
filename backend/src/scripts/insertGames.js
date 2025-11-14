const mongoose = require('mongoose');
const Game = require('../models/Game');
require('dotenv').config();
const connectDB = require('../config/db');

const games = [
  { name: 'Super Mario Bros' },
  { name: 'The Legend of Zelda' },
  { name: 'Sonic the Hedgehog' },
  { name: 'Metroid' },
  { name: 'Animal Crossing' },
  { name: 'Fire Emblem' },
  { name: 'Splatoon' },
  { name: 'Pokémon' },
  { name: 'Kirby' },
  { name: 'Donkey Kong' }
];

(async () => {
  await connectDB();
  await Game.deleteMany({});
  await Game.insertMany(games);
  console.log('Games inseridos com sucesso!');
  process.exit(0);
})();
