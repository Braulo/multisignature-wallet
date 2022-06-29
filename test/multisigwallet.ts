import { expect } from "chai";
import { ethers } from "hardhat";
import { MultiSigWallet } from "../typechain";

describe("MultiSigWallet", function () {
  const required = 3;
  let contractMultiSigWallet: MultiSigWallet;
  let adminAddresses: string[] = [];
  let accounts;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    adminAddresses.push(accounts[0].address);
    adminAddresses.push(accounts[1].address);
    adminAddresses.push(accounts[2].address);

    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    contractMultiSigWallet = await MultiSigWallet.deploy(
      adminAddresses,
      required
    );
    await contractMultiSigWallet.deployed();
  });

  it("should add users as admins", async function () {
    expect((await contractMultiSigWallet.getAllAdmins()).length).to.equal(
      adminAddresses.length
    );
  });

  it("should return true for the first admin", async function () {
    expect(await contractMultiSigWallet.isAdmin(adminAddresses[0])).to.equal(
      true
    );
  });
});
