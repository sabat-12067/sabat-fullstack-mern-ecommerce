# E-Store

![Alt text](HomePage.png?raw=true "Title")

A comprehensive and modern e-commerce platform built with React, Tailwind CSS, and Node.js, designed to provide a seamless and intuitive shopping experience. This project features user authentication, product browsing, cart management, and secure payment processing using Stripe.
## Features

- User Authentication (Login, Registration, Password Reset)
- Browse Products by Category, Brand name, product name
- View Product Details
- Add Products to Cart
- Checkout with Stripe Integration
- View Order History
- Responsive Design

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Payment Gateway:** Stripe
- **Other Libraries:** moment.js, react-toastify

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    https://github.com/kumarprince06/Full-Stack-MERN-E-Commerce.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Full-Stack-MERN-E-Commerce
    ```

3. Install dependencies for both frontend and backend:

    - Frontend:
        ```bash
        cd frontend
        npm install
        ```

    - Backend:
        ```bash
        cd ../backend
        npm install
        ```

### Configuration

1. Set up environment variables:

    Create a `.env` file in the `server` directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    STRIPE_SECRET_KEY=your_stripe_secret_key
    FRONTEND_URL=http://localhost:3000
    MAIL_HOST=your_smtp
    MAIL_USER=your_email
    MAIL_PASS=your_mail_app_security_key  
    STRIPE_SECRET_KEY =your_stripe_account_secret_key
    STRIPE_WEBHOOK_END_POINTS_SECRET = your_Stripe_Webhook_endpoints_Sekret_key
    ```

2. Configure Stripe in `sbackend/config/stripe.js`:
    ```javascript
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    module.exports = stripe;
    ```

### Running the Application

1. Start the MongoDB server:
    ```bash
    mongod
    ```

2. Start the backend server:
    ```bash
    cd backend
    npm run dev
    ```

3. Start the frontend server:
    ```bash
    cd ../frontend
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### User Authentication

- Register a new account or log in with existing credentials.
- Reset password using the email provided during registration.

### Browsing Products

- Navigate through various product categories.
- Click on a product to view detailed information.

### Adding Products to Cart for admin

- Add desired products to the cart from the product details page.
- Adjust quantities in the cart.

### Checkout

- Proceed to checkout from the cart page.
- Complete payment using Stripe.

### Order History

- View past orders and order details in the order history section.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

---


