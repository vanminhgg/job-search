const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  secure: false,

  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: process.env.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

client
  .ping()
  .then((response) => console.log("You are connected to Elasticsearch!"))
  .catch((error) => console.error("Elasticsearch is not connected."));

module.exports = client;
