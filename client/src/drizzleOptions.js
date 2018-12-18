import MyStringStore from "./contracts/FomoNoCallback.json";
import FomoJson from "./contracts/Fomo.json";


const drizzleOptions = {
  contracts: [MyStringStore, FomoJson],
  events: {
    MyStringStore: ['WinnerAnnouncement', 'PayEvent'],
	FomoJson: ['WinnerAnnouncement', 'payEvent']
  }
}

export default drizzleOptions;
