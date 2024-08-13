---
sidebar_position: 4
---

# Frequently Asked Questions

### How much does it cost?

AnyFlow is free for testnet deployments. For mainnet deployments, we charge a unified fee in USD based on the gas cost of your deployment and its complexity. You can check the estimated cost before deploying.

### How does AnyFlow handle gas fees during deployment?

AnyFlow estimates gas fees based on the current network conditions and provides a unified fee in USD before deployment. You have the option to approve or reject the deployment based on the estimated cost.

### How does AnyFlow ensure deployment reliability?

AnyFlow uses multiple RPC providers, automatic retries, and failover mechanisms to ensure that your deployments are reliable and successful. Additionally, you can test deployments on testnet environment before pushing to the mainnet.

### Who owns the contract after it is deployed?

We strongly recommend you set the contract's owner and other roles in the contract constructor.

Though, if the contract is `Ownable` and it's owner is the deployer's account, the platform will call the `transferOwnership` function right after the deployment and transfer the ownership to your account's address. If not set in the configs, AnyFlow will hold it until it is set.

### What RPC providers are being used?

Currently, the system uses Alchemy, Infura, Ankr, ThirdWeb, and each chain's official public RPCs. We frequently monitor each RPC provider's performance and availability to ensure the best experience for our users. 

### Which block explorers are supported?

Currently only Etherscan.

### Where are the private keys stored?

Private keys are stored in the platform's secure vault KMS.

### What if I do not want the contract to be verified?

There is an option to disable the code verification process in the deployment configuration step.

### Need help?

Just send an email to support@anyflow.pro
