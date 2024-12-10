---
sidebar_position: 6
---

# Frequently Asked Questions

### Smart contract deployment is not an issue for me. Why should I use AnyFlow?

Check our [Why AnyFlow?](./1_why.md) page for more information.

### How much does it cost?

AnyFlow is free for testnet deployments. For mainnet deployments, we charge a unified fee in USD based on the gas cost of your deployment and its complexity. You can check the estimated cost before deploying.

### How does AnyFlow handle gas fees during deployment?

AnyFlow estimates gas fees based on the current network conditions and provides a unified fee in USD before deployment. You have the option to approve or reject the deployment based on the estimated cost.

### How does AnyFlow ensure deployment reliability?

AnyFlow uses multiple RPC providers, automatic retries, and failover mechanisms to ensure that your deployments are reliable and successful. Additionally, you can test deployments on testnet environment before pushing to the mainnet.

### Who owns the contract after it is deployed?

We strongly recommend you set the contract's owner and other roles in the contract constructor.

Though, if the contract is `Ownable` and it's owner is the deployer's account, the platform will call the `transferOwnership` function right after the deployment and transfer the ownership to your account's address. If not set in the configs, AnyFlow will hold it until it is set.

### Which RPC providers are being used?

Currently, the system uses Alchemy, Infura, Ankr, ThirdWeb, and each chain's official public RPCs. We frequently monitor each RPC provider's performance and availability to ensure the best experience for our users. 

You can always check the status of the RPC providers on our [chains page](https://anyflow.pro/chains).

### Which block explorers are supported?

We support Etherscan and Blockscout for Ethereum-based networks. To change your preferred block explorer, you can update the configuration in your [settings page](https://app.anyflow.pro/settings/block-search).

### Who owns the private keys used for deployment?

Check our [How AnyFlow Works documentation](./how_it_works/1_private_keys.md) for more information.

### What if I do not want the contract to be verified?

There is an option to disable the code verification process in the deployment configuration step.

### Need help?

If you have any questions or need help, feel free to reach out to us on [Discord](https://discord.gg/aCygGwBWya) or [Twitter/X](https://x.com/anyflow_).
