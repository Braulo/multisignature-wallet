import { ethers } from "hardhat";

async function main() {
  const Wallet = await ethers.getContractFactory("MultiSigWallet");
  const wallet = await Wallet.deploy(
    (await ethers.getSigners()).map((acc) => acc.address),
    3
  );

  await wallet.deployed();

  console.log("Wallet deployed to:", wallet.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
