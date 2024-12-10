---
sidebar_position: 5
---

# AnyFlow CLI FAQ

### How does the CLI work?
The AnyFlow CLI is a command-line tool that allows you to deploy your smart contracts to multiple blockchains with a single command and zero configuration. It merges Hardhat configuration file with the AnyFlow configuration file allowing us to use the AnyFlow API to interact with the blockchain networks and do everything for you.

### What to do if deployments are taking too long?

If you're deploying to multiple networks, the deployment process will take longer because the CLI deploys to each network sequentially. If you want to speed up the deployment process, you can use the [AnyFlow Web UI](../intro.md) to deploy your contracts to multiple networks simultaneously. This will execute the deployment process in parallel, significantly reducing the deployment time for you and your team.

### I see private keys in the anyflow-cli package. Is it safe?

Yes! The private keys are used only to identify accounts, not to sign them. The signing process is done securely in the [RPC proxy](../how_it_works/4_rpc_gateway.md) server, away from the CLI, preventing any private key exposure on your machine. If you want to learn more about how we secure your private keys, you can read our [How AnyFlow Works documentation](../how_it_works/1_private_keys.md).

### What if I want to stop using AnyFlow in my project?

We would be sad to see you go, but you can easily remove AnyFlow from your project by running the `anyflow uninstall` command. We designed all our tools with the developer in mind, so we made sure that you can easily customize your owns configurations and deployments if needed.

### Are my credentials safe?

Yes! The AnyFlow CLI uses encrypts your credentials and stores them locally on your machine.

### How do I reset my credentials?
Run the logout command to clear credentials and re-authenticate.

```bash
anyflow logout
```

## Troubleshooting

If you have any questions or need help, feel free to reach out to us on [Discord](https://discord.gg/aCygGwBWya) or [Twitter/X](https://x.com/anyflow_).
