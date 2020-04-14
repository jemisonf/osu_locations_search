axios = require("axios");
cors = require("cors");
express = require("express");
qs = require("querystring");

const app = express();

app.use(express.json());
app.use(cors());

let token = null;
const key = process.env.KEY;
const secret = process.env.SECRET;

setToken = async () => {
  const response = await axios.post(
    "https://api.oregonstate.edu/oauth2/token",
    qs.stringify({
      client_id: key,
      client_secret: secret,
      grant_type: "client_credentials",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  token = response.data.access_token;
};

app.get("/query", async (req, res) => {
  queries = Object.keys(req.query)
    .map((query) => `${query}=${req.query[query]}`)
    .join("&");
  console.log(queries);
  const response = await axios.get(
    `https://api.oregonstate.edu/v1/locations?page%5Bsize%5D=10${
      queries !== "" ? `&${queries}` : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  res.status(200).send(response.data);
});

setToken().then(() => {
  app.listen(5000, () => console.log("starting on port 3000"));
});
