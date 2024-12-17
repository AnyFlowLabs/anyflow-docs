---
sidebar_position: 1
---

# Starting with Anyflow CLI

To get started with the AnyFlow CLI, you'll need to authenticate your session. Follow these steps:

1. **Initialize Your Project**: If you are starting a new project, navigate to your project directory:

   ```bash
   mkdir my-anyflow-project
   cd my-anyflow-project
   ```

2. **Run the Init Command**: This command will create the necessary environment variables:

   ```bash
   anyflow init
   ```

3. **Run the Install Command**: This command will update your Hardhat configuration file:

   ```bash
   anyflow install
   ```

## Important Notes
   - The command will modify your `hardhat.config.js` or `hardhat.config.ts`
   - It searches for a configuration object with the name containing "HardhatUserConfig"
   - Example of valid configuration names:
     ```typescript
     const config: HardhatUserConfig = {
       // your config
     }
     ```
     ```javascript
     const myHardhatUserConfig = {
       // your config
     }
     ```
   - If your configuration object doesn't include "HardhatUserConfig" in its name, the installation will fail
   - Make sure to backup your configuration file before running this command
   - If you have a custom configuration, you can manually update your configuration file
   - 
