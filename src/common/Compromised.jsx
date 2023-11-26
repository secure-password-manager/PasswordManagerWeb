import axios from "axios";
import { generateSHA1Hash } from "../lib/encryption.ts";

const PWNED_API_URL = "https://api.pwnedpasswords.com/range/";

async function checkIsPasswordCompromised(password) {
  const hash = await generateSHA1Hash(password);
  const shortHash = hash.substring(0, 5);
  const hashSuffix = hash.substring(5).toUpperCase();

  try {
    const response = await axios.get(`${PWNED_API_URL}${shortHash}`);

    if(response.data) {
      const results = response.data.split('\r\n');

      for(const result of results) {
        const [hashResult, numCompromises] = result.split(':');
        if(hashResult === hashSuffix) {
          return numCompromises;
        }
      }
    }
    return "0";
  }
  catch (error) {
    return "-1";
  }
}

export { checkIsPasswordCompromised };