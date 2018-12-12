import MyStringStore from "./contracts/FomoNoCallback.json";
import FomoJson from "./contracts/Fomo.json";


const drizzleOptions = {
  contracts: [FomoJson],
  events: {
    FomoJson: ['WinnerAnnouncement', 'PayEvent']
  }
}

export default drizzleOptions;
