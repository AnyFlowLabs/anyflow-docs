---
Tags: features
---
# Deterministic Addresses

If configured to do so, AnyFlow will deploy your smart contracts to the same address across different chains. This can be useful for a variety of reasons, such as:

- Simplifying the deployment process by allowing you to know the address of your smart contract before deploying it.
- Making it easier to interact with your smart contract by using the same address across different chains.
- Freeing you from the need to keep track of multiple addresses for the same smart contract.

AnyFlow does this by leveraging its [RPC gateway](/docs/how_it_works/rpc_gateway) to redirect the deployment transactions to the [`CreateX` Factory](https://github.com/pcaversaccio/createx), which is a smart contract that uses the `CREATE2` opcode to deploy smart contracts to deterministic addresses.

To use this deterministic addresses feature, you need to check the `deterministic addresses` option in your deployment config.

