import sslCommerzPayment from "sslcommerz-lts";

const store_id = "self6327273f0748d";
const store_passwd = "self6327273f0748d@ssl";
const is_live = false;

export const sslInit = (req, res, next) => {
  const data = {
    total_amount: 100,
    currency: "BDT",
    tran_id: "REF221", // use unique tran_id for each api call
    success_url: `${process.env.ROOT_URL}/sslcommerz/success`,
    fail_url: `${process.env.ROOT_URL}/sslcommerz/fail`,
    cancel_url: `${process.env.ROOT_URL}/sslcommerz/cancel`,
    ipn_url: `${process.env.ROOT_URL}/sslcommerz/ipn`,
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const SSL = new sslCommerzPayment(store_id, store_passwd, is_live);

  SSL.init(data).then((apiResponse) => {
    let GatewayURL = apiResponse.GatewayPageURL;

    res.status(200).json({
      paymentLink: GatewayURL,
    });

    console.log("Redirecting to: ", GatewayURL);
  });
};

export const success = async (req, res, next) => {
  const data = req.body;
  res
    .status(200)
    .redirect(
      `/success/val_id=${data.val_id}&tran_id=${data.tran_id}&amount=${data.amount}`
    );
};

export const failed = async (req, res, next) => {
  const data = req.body;
  res.status(200).redirect("/failed");
};

export const canceled = async (req, res, next) => {
  const data = req.body;
  res.status(200).redirect("/canceled");
};
