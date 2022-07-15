# MultiSigWallet for ERC20, ERC721 and Ether transactions.

This repository contains a simple fully tested n of m\* MultiSigWallet contract that can be used with ERC20, ERC721 and Ether tokens.

TODO: Might develop a frontend interface in the future ;)

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
[0xC2c8809CC17aE602495e1bE04847fFCB142dA9d2](https://goerli.etherscan.io/address/0xC2c8809CC17aE602495e1bE04847fFCB142dA9d2)

### Documentation

see contract comments.

### About

This project is experimental, use at your own risk. The project is developed in my free time as a way to learn Ethers and Hardhat.
