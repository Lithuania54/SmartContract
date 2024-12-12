import { ethers } from "hardhat";

async function main() {
  console.log("Deploying the SubscriptionService contract...");

  try {
    // Get the contract factory
    const SubscriptionService = await ethers.getContractFactory("SubscriptionService");

    // Deploy the contract
    const subscriptionService = await SubscriptionService.deploy();

    // Wait for the deployment transaction to be mined
    const deploymentTransaction = await subscriptionService.deploymentTransaction();
    const receipt = await deploymentTransaction?.wait();

    if (!receipt || !deploymentTransaction) {
      throw new Error("Deployment transaction not found or failed to mine.");
    }

    // Log deployment details
    console.log("Transaction hash:", deploymentTransaction.hash);
    console.log("SubscriptionService deployed to:", subscriptionService.target!);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deploying the contract:", error.message);
    } else {
      console.error("Error deploying the contract:", error);
    }
    process.exit(1);
  }
}

// Handle async errors and exit properly
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unhandled error:", error.message || error);
    process.exit(1);
  });
