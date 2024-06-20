import axios from "axios";
export const httpClient = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer 30e51a01e8b444beb894d36ffd1d4749ec2897d56d449da9a48e25adc022f863"
  },
});
