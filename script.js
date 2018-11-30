import http from "k6/http";
import { sleep } from "k6";

const randNumGen = (min, max) => {
  let rand = (Math.random() * (max - min)) + min;
  return Math.floor(rand);
}

export default function() {
  http.get(`http://localhost:3004/courses/${randNumGen(1, 8999999)}`);
  sleep(1);
};