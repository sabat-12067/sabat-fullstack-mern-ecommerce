const stripe = require("../../config/stripe");
const cartModel = require("../../model/Cart");
const orderModel = require("../../model/OrderProductModel");

const endpointSecret = process.env.STRIPE_WEBHOOK_END_POINTS_SECRET;

const webHooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  console.log("Endpoints Secret: ",endpointSecret)
  const payloadString = JSON.stringify(req.body);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  //Handle product data from event to save into order db
  const getLineItems = async (lineIntems) => {
    let productItems = [];
    if (lineIntems?.data?.length) {
      for (const item of lineIntems.data) {
        const product = await stripe.products.retrieve(item.price.product);
        const productId = product.metadata.productId;
        const productData = {
          productId: productId,
          name: product.name,
          price: item.price.unit_amount / 100,
          quantity: item.quantity,
          image: product.images,
        };
        productItems.push(productData);
      }
    }
    return productItems;
  };

  //Handle delete cart products
  const deleteCartProduct = async(productId, userId) =>{
   
    const deleteProduct = await cartModel.findOneAndDelete({productId: productId, userId : userId})
    if(deleteProduct){
      console.log(`Product delete with Product Id : ${productId} and User Id : ${userId}`)
    }
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      // console.log("Session : ",session)
      // console.log("Session User Id",session.id)
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      // console.log("Line Items: ",lineItems)
      // console.log("Total Amount : ", session.amount_total/100)
      const productDetails = await getLineItems(lineItems);
      // console.log("Product Details : ", productDetails)
      const orderDetails = {
        productDetails : productDetails,
        email : session.customer_email,
        userId : session.metadata.userId,
        paymentDetails : {
          paymentId : session.payment_intent,
          payment_method_type : session.payment_method_types,
          payment_status : session.payment_status,
        },
        shipping_options : session.shipping_options,
        total_amount : session.amount_total/100
      };
      const order = new orderModel(orderDetails);
      const saveOrder = await order.save();


      if(saveOrder){
        productDetails.map(async(product)=>{
          await deleteCartProduct(product.productId, session.metadata.userId)
        })
        // const deletedCartProduct = await deleteCartProduct(productDetails, session.metadata.userId)
      }

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
};

module.exports = webHooks;
