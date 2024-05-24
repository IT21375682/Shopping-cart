# E-Commerce Application

## Project Description
This is a full-featured e-commerce application built using React for the frontend and Node.js with Express for the backend. The application allows users to browse products, add them to the cart, and proceed to checkout. Admin users can add new products and manage the inventory.

## Features
- User authentication and authorization
- Product listing and search functionality
- Add to cart and view cart items
- Checkout process with multiple payment methods
- Admin product management

## Installation Instructions
To run the application locally, follow these steps:

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository/backend
2. Install dependencies:
npm install

3.Create a .env file in the backend directory and add the following environment variables:

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Start the backend server:
npm start


###Frontend Setup

1.Navigate to the frontend directory:
cd ../frontend

2.Install dependencies:
npm install

3.Create a .env file in the frontend directory and add the following environment variables:
REACT_APP_API_URL=http://localhost:5000/api

4.Start the frontend development server:
npm run start:legacy

Video Demo
Watch the setup video for a visual guide on setting up the application
[https://drive.google.com/drive/folders/1ztzCLY9Xa4DGiTzW4cgLgn6SH73bLghs?usp=sharing](https://shorturl.at/NIkM5)
