import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Default Hardhat node
    },
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache CLI or GUI default
      accounts: [
        "0xa2320beeb142757280e413526f291b990af57d73cc03bb8396938953c4bf7c10", // Replace with accounts from Ganache
        "0x230cdc3917a3ceeec8520411a116964f8344510bc27937ece0ed6260d8deb008",
        "0x64634f225ad0a4b4ad131f0a19dcf65d039e50193a67538510852eb7c65a4c27",
      ],
    },
  },
};

export default config;
