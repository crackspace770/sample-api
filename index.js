const express = require('express')
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.route.js');
const app = express()

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.listen(3000, () => { 
  console.log('Server is running on http://localhost:3000')
})

app.get('/', (req, res) => {
  res.send('Hello World From Node API Server 2005')
});


//routes
app.use('/api/products', productRoutes);



//database connection
mongoose.connect('mongodb+srv://crackspace990:mU76h8mtl8jG3fX5@backenddb.boqeb.mongodb.net/Node_API?retryWrites=true&w=majority&appName=BackendDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
}).then(() => {
  console.log('Database Connected') 
})
.catch((err) => {
  console.log('Error:', err)
});