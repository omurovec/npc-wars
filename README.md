# Deployments

## Goerli

```sh
CompetitionFactory 0x682F92C28Bc8b36e97717e1E0b1C8fc15809906d
Verifier     0xAB768e4Ad46acA4556D22b2A2f6F809Eb8c7De00
NPCFactory   0xDa88f0c284e6E2E93d55B985468aC77Bfff69017
Competition  0xDcda93e6Dea2aBbB7d61DBfa9B133f815A4dD684
```

## Base

```sh
CompetitionFactory 0x408f1814d4DbbC1c480333796878f4d0016A1281
Verifier     0x030e50597af6044CAd2977D8FBfe08A4DA651d52
NPCFactory   0x3645C5E610dBde403963E8064C025c7321D615A3
Competition  0x5484FE57Bc1496756BD378d8df3C80Af538F9cA3
```

## Scroll

```sh
CompetitionFactory 0x0E54336875cf6DdBD851A1E585245983BedA348c
Verifier     0xC82AD4aC9fF53ba73318663c9AAA70429bDDE21e
NPCFactory   0xdA80A38DAd84c47a0400C836D7dd30849fb00407
Competition  0x79A6BE02fBb96493e7B1fb308A5a10DD6a24C2d1
```

## Metis

```sh
CompetitionFactory 0x24A7614dE5ad4b9De1029208BCa1c4ba9094222D
Verifier     0xdA80A38DAd84c47a0400C836D7dd30849fb00407
NPCFactory   0xd8d6Bac4008B976a51d5D870052F5AE8A9f5CcF3
Competition  0x9F2cCAC92e1326b6eAE86cbad4Ba5dF810e5450C
```

## Neon

```sh
CompetitionFactory 0x0E54336875cf6DdBD851A1E585245983BedA348c
Verifier     0xC82AD4aC9fF53ba73318663c9AAA70429bDDE21e
NPCFactory   0xdA80A38DAd84c47a0400C836D7dd30849fb00407
Competition  0x79A6BE02fBb96493e7B1fb308A5a10DD6a24C2d1
```

## Localhost

```sh
CompetitionFactor 0x5fbdb2315678afecb367f032d93f642f64180aa3
NPCFactory 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
```

# Testing Locally

1. Start a local chain

```sh
anvil
```

2. Deploy the contracts

```sh
cd contracts
forge script script/Deploy.s.sol --broadcast --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

3. Start the API

```sh
cd api
cargo run
```

4. Startup a local graph node

```sh
cd subgraph
docker-compose up
```

5. Deploy the subgraph

```sh
cd subgraph
yarn create-local
yarn deploy-local
```

6. Start front-end

```sh
cd frontend
yarn start
```
