---
sidebar_position: 3
---

# Deploying

## Deploying a multichain contract

Before deploying your contract, ensure it's compiled using the Hardhat CLI:

```bash
hardhat compile
```

Once your project is compiled, you can deploy your contract using the AnyFlow CLI. The basic deployment syntax is:

```bash
anyflow deploy --networks <network_chain_id>
```

### Example

You can deploy to multiple networks simultaneously by specifying their chain IDs as arguments:

```bash
anyflow deploy --networks 137 80002 11155111
```

This will deploy your contracts to:
- Polygon Mainnet (137)
- Mumbai Testnet (80002)
- Sepolia Testnet (11155111)

The deployment process runs locally using the network configurations that were automatically set up during project initialization.

## Deterministic Addresses

To use deterministic addresses for your contracts, you can use the `--deterministic-addresses` flag. This will generate a deterministic address for your contract on each network.

```bash
anyflow deploy --networks 137 --deterministic-addresses true
```

## Fix

Sometimes the cli you fail to update anyflow on the status of the deployment,
this will create a file that keeps track of the deployment status, you can manually fix the status by running the following command:

```bash
anyflow fix
```
