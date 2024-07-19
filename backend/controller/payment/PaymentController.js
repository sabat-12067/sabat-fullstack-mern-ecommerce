const stripe = require("../../config/stripe");
const userModel = require("../../model/userModel");

const PaymentController = async (request, response) => {
  try {
    const { cartItems } = request?.body;
    // console.log("Cart Items",cartItems)
    const currentUser = await userModel.findById({ _id: request?.userId });

    const params = {
      submit_type: "pay",
      mode: "payment",
      // payment_method_types: ['card'],
      payment_method_types: ['card'],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1Pde21LgyvtECR7Rm8QCD1w1",
        },
      ],
      customer_email: currentUser.email,
      metadata : {
        userId : request.userId
      },
      line_items: cartItems.map((item, index) => {
        const images = item.productId.productImage.filter(image => image);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: images,
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.sellingPrice*100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);

    response.status(303).json(session);
  } catch (error) {
    response.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = PaymentController;
