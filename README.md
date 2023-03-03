# Testing Locally

1. Start a local chain

```sh
anvil
```

2. Deploy the contracts

```sh
cd contracts
forge forge script script/Deploy.s.sol --broadcast --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
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
