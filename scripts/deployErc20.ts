import { ethers } from "hardhat";

async function main() {
  const erc20contract = await ethers.getContractFactory("ERC20TestToken");
  const erc20 = await erc20contract.deploy("TestToken", "TST", 10000);

  await erc20.deployed();

  console.log("ERC20 deployed to:", erc20.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
