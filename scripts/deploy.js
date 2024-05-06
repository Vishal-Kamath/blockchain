const hre = require("hardhat");

async function main() {
  const ChatApp = await hre.ethers.getContractFactory("ChatApp");
  const chatApp = await ChatApp.deploy();
  await chatApp.waitForDeployment();

  console.log("ChatApp deployed to:", await chatApp.getAddress());
  console.log(
    "Chain Id",
    (await hre.ethers.provider.getNetwork()).chainId.toString()
  );
}
main();
