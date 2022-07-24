# MultiSigWallet for ERC20, ERC721 and Ether transactions.

This repository contains a simple, fully tested n of m\* multi-signature-wallet contract that can be used with ERC20, ERC721 and Ether transactions. Also contains a next.js frontend.

- not all signers have to approve a transaction only until the 'required' amount is reached

### Development

1. Install all node packages

```bash
> npm install
```

2. Compile the solidity code to get the artifacts

```bash
> npx hardhat compile
```

Now you are all set and good to use this app

### Testing

```bash
> npx hardhat test
```

### Deployment

```bash
> npx hardhat run scripts/deploy.js --network ...
```

A verified contract can be found on the goerli network = <br>
[0x123c75cB21f28C68bca4F25Bb06ce43c77881e2d](https://goerli.etherscan.io/address/0x123c75cB21f28C68bca4F25Bb06ce43c77881e2d)

### Deployment

```bash
> docker build . --tag multisig-wallet-image
```

```bash
> docker run -p PORT:PORT --name multisig-wallet-contianer multisig-wallet-image
```

### Documentation

see contract comments.

### About

This project is experimental, use at your own risk. The project is developed in my free time as a way to learn Ethers and Hardhat.
