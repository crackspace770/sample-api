const express = require('express')
const mongoose = require('mongoose');
const multer = require('multer');
const productRoutes = require('./routes/product.route.js');
const authRoutes = require('./routes/auth.route.js');
const app = express()

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const storage = multer.memoryStorage(); // Store files in memory (or use diskStorage for local storage)
const upload = multer({ storage: storage });

const { MONGO_URI } = require('./utils/const');



app.listen(8080, () => { 
  console.log('Server is running on http://localhost:8080')
})

app.get('/', (req, res) => {
  res.send('Hello World From Node API Server 2025')
});


//routes
app.use('/api/products', productRoutes);

app.use('/api/auth', authRoutes);



//database connection
mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
}).then(() => {
  console.log('Database Connected') 
})
.catch((err) => {
  console.log('Error:', err)
});