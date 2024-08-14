---
sidebar_position: 2
---

# How AnyFlow Works

If you are a seasoned web3 developer, you may be asking yourself how does AnyFlow manage to securely deploy your smart contracts without asking for private keys or any additional configuration. In this section, we will explore the inner workings of AnyFlow.

### Private Keys

AnyFlow does not ask your private keys to deploy your smart contracts. Instead, we use our own. This way, you don't have to worry about managing your private keys being exposed or stolen. Our private keys are stored in a secure vault, and we only use them to deploy your smart contracts.

In the near future, we plan to allow you to customize the signing process, so you can use your own private keys, external wallets, hardware wallets, and multi-sig wallets. This also ensures a more secure deployment process by allowing you to have full control over the signing process.

Please note that we only use the keys to deploy your smart contract. You should always transfer the ownership of the contract to your own account during the deployment process.

### Isolated Environments

Each deployment has its own isolated ephemeral environment, so you don't have to worry about other deployments affecting your code neither your code affecting other deployments. We do this by detecting your project's dependencies (node engine version) and dockerizing the script's execution. Moreover, this allows us to scale the deployment process horizontally, ensuring that your deployment is always fast and reliable.

<!-- ### Zero configuration

AnyFlow aims to provide a fluid deployment experience, abstracting away everything that is boring, repetitive or error-prone. This means that you don't have to worry about setting up your  -->
