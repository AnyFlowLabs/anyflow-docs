---
sidebar_position: 3
---

# Deploying

Before deploying your contract, ensure it's compiled using the Hardhat CLI:

```bash
hardhat compile
```

Once your project is compiled, you can deploy your contract using the AnyFlow CLI. The basic deployment syntax is:

```bash
anyflow deploy --networks <network_chain_id> [--verify] [--deterministic-addresses]
```

### Example

You can deploy to multiple networks simultaneously by specifying their chain IDs or aliases as arguments:

```bash
anyflow deploy --networks polygon polygonAmoy 11155111
```

This will deploy your contracts to:
- Polygon Mainnet (137)
- Polygon Amoy Testnet (80002)
- Sepolia Testnet (11155111)

The deployment process runs locally using the network configurations that were automatically set up during project initialization.

Because the AnyFlow CLI uses the Hardhat configuration file, you don't need to specify any additional deployment configurations. The CLI will automatically use the network configurations set up in the `hardhat.config.js` file.

## How to verify smart contracts

To verify your smart contracts on the blockchain, you can use the `--verify` flag. This will verify your contracts on the blockchain after deployment.

```bash
anyflow deploy --networks 137 --verify
```

## How to have the same contract address on all networks

To have the same contract address on all networks, you can use the `--deterministic-addresses` or `-da` flag. This will generate a deterministic address for your contract on each network.

```bash
anyflow deploy --networks 137 --deterministic-addresses
```

## Caveats

### Deployment time

Because we're running the deployment process locally, each network will be deployed sequentially. This means that the deployment process will take longer if you're deploying to multiple networks. If you want a faster deployment process, you [can use the AnyFlow Web UI](../intro.md) to deploy your contracts to multiple networks simultaneously. This will execute the deployment process in parallel, significantly reducing the deployment time for you and your team.

## Fix stuck status

Sometimes the cli you fail to update anyflow on the status of the deployment,
this will create a file that keeps track of the deployment status, you can manually fix the status by running the following command:

```bash
anyflow deploy fix-status
```
