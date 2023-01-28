const express = require("express");
const app = express();
const cors = require("cors");
const mongoConnect = require("./config/database");
const dotenv = require("dotenv");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

dotenv.config();
app.use(express.json());
app.use(cors());
mongoConnect();

var schema = buildSchema(`
    type User{
        name:String,
        email:String,
        phone:String,
        password:String
    }
    type Query {
        user :User
    }
`);
const user = {
  name: "Kajol Roy",
  email: "shrikajol@gmail.com",
  phone: "01705956055",
  password: "1234",
};
const resolver = {
  user: () => {
    return user;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolver,
  })
);

app.get("/", (req, res) => {
  res.status(300).send({ message: "Welcome !" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
