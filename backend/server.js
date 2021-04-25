require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const path = require("path");
app.use(express.json());
app.use(morgan("dev"));
const db = require("./database/db");
db();

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const uploadRoute = require("./routes/uploadRoute");
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/uploads", uploadRoute);

//paypal
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));


app.listen(PORT, () => {
  console.log("Server is running: " + PORT);
});
