import MyStringStore from "./contracts/FomoNoCallback.json";
import FomoJson from "./contracts/Fomo.json";


const drizzleOptions = {
  contracts: [MyStringStore],
  events: {
    MyStringStore: ['WinnerAnnouncement', 'PayEvent']
  }
}

export default drizzleOptions;
