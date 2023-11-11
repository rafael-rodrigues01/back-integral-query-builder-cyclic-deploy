require('dotenv').config();
const express = require('express');
const rotas = require('./rotas');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotas);

app.listen(
  3000,
  () => console.log(process.env.PORT)
  // console.log('Server is running at: http://localhost:3000')
);
