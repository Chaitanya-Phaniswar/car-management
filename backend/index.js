const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
//const swagger = require('./swagger')
dotenv.config();
// backend/index.js

//swagger(app,5000)
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));



app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

app.get('/', (req, res) => {
  res.send('Car Management API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
