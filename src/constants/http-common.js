import axios from "axios";

export default axios.create({
  baseURL: "https://mysite-idgd.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
})