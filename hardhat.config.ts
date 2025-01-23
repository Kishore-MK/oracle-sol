import { HardhatUserConfig } from "hardhat/config";
require('dotenv').config();
import "@nomiclabs/hardhat-ethers";
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork:"sepolia",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/1EKW0gGvpPFnLxMNQG575Fw5nswwXYj_",
      accounts: ["0x6149a90d41ffb60d57220f4bc650daf4df07fce4c1c008820fb631c930881c67"]
    }
  },
};

export default config;
