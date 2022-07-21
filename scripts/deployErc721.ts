import { ethers } from "hardhat";

async function main() {
  const erc721contract = await ethers.getContractFactory("ERC721TestToken");
  const erc721 = await erc721contract.deploy("TestNFT", "TST");

  await erc721.deployed();

  console.log("ERC721 deployed to:", erc721.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
