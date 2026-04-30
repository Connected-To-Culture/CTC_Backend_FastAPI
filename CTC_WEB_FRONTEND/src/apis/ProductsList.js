import axios from "axios";

//NODE_ENV = "PROD";
//NODE_ENV = "DEV"

const baseURL =
  process.env.NODE_ENV === "PROD"
    ? "/products/getProducts/"
    : "http://127.0.0.1:8000/products/getProducts/";

export default axios.create({
  baseURL: baseURL,
});
