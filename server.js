const express = require('express');
const cors = require('cors');
const path = require('path');
//const bodyParser = require('body-parser');

//Customer Routes
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customersRoutes');
const addressRoutes = require('./routes/addressesRoutes');
const orderRoutes = require('./routes/orderRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const paymentRoutes = require('./routes/paymentRoutes');  

//Admin Routes
const adminRoutes = require('./routes/adminRoutes')
const adminCatRoutes = require('./routes/adminCategoriesRoutes');
const adminCustRoutes = require('./routes/adminCustomersRoutes');
const adminProductRoutes = require('./routes/adminProductsRoutes')
const adminOrderRoutes = require('./routes/adminOrdersRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');

const app = express();


app.use(express.json()); 
//app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));


// Configure CORS to allow requests from the frontend endpoint
app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

app.use('/images', express.static(path.join('C:/Users/Rhea Thadhani/Desktop/final-year-project/FYPSystem/frontend/src/assets/images')));

// Register all the routes
app.use(categoryRoutes);
app.use(cartRoutes);
app.use(productRoutes);
app.use(customerRoutes);
app.use(addressRoutes);
app.use(orderRoutes);
app.use(checkoutRoutes);
app.use(paymentRoutes);

app.use(adminRoutes);
app.use(adminCatRoutes);
app.use(adminCustRoutes);
app.use(adminProductRoutes);
app.use(adminOrderRoutes);
app.use(adminDashboardRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
