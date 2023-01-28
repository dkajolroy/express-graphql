const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const mongoConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected "))
    .catch(() => console.log("Database Connect Failed "));
};

module.exports = mongoConnect;
