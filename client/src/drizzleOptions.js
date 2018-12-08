import MyStringStore from "./contracts/FomoNoCallback.json";

const drizzleOptions = {
  contracts: [MyStringStore],
  events: {
    MyStringStore: ['WinnerAnnouncement']
  }
}

export default drizzleOptions;
