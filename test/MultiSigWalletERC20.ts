import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC20TestToken, MultiSigWallet } from "../typechain";

describe("MultiSigWallet", function () {
  const required = 3;
  let contractMultiSigWallet: MultiSigWallet;
  let adminAddresses: string[] = [];
  let signers: SignerWithAddress[];
  let contractERC20TestToken: ERC20TestToken;

  before(async () => {
    signers = await ethers.getSigners();
    adminAddresses.push(signers[0].address);
    adminAddresses.push(signers[1].address);
    adminAddresses.push(signers[2].address);

    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    contractMultiSigWallet = await MultiSigWallet.deploy(
      adminAddresses,
      required
    );
    await contractMultiSigWallet.deployed();

    const ERC20TestToken = await ethers.getContractFactory("ERC20TestToken");
    contractERC20TestToken = await ERC20TestToken.deploy(
      "TestToken",
      "TST",
      100
    );

    await contractERC20TestToken.deployed();
  });

  it("should deposit ERC20 token to wallet", async function () {
    await contractERC20TestToken.approve(contractMultiSigWallet.address, 100);
    await contractMultiSigWallet.depositERC20ToWallet(
      contractERC20TestToken.address,
      10
    );
    expect(
      await contractMultiSigWallet.getContractERC20Balance(
        contractERC20TestToken.address
      )
    ).to.be.equal(10);
  });
});
