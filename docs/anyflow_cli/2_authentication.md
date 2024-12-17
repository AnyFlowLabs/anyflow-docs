---
sidebar_position: 2
---

# Authenticating

1. **Authenticate**: Run the following command to authenticate your session:

   ```bash
   anyflow auth
   ```

   **Steps to Authenticate:**
   - This command will open the [AnyFlow Web Application](https://app.anyflow.pro) in your browser.
   - Log in using your GitHub account.
   - Once logged in, go to your [API Keys](https://app.anyflow.pro/settings/api) setting and copy it.
   - Return to your terminal and enter the API key when prompted to complete the authentication process.

2. **API Key Storage:**
   - By default, your API key will be securely stored in your system's keychain.
   - The storage method is automatically handled by the CLI to ensure maximum security.
   - If keychain access is not available, the API key will be encrypted and stored in `~/.anyflow`.
   - You can try to troubleshoot the keychain access issue [here](./4_keytar_troubleshoot.md).

3. **Verify Authentication**: After successful authentication, verify your login status by running:

   ```bash
   anyflow check-auth
   ```

   If you see a confirmation message, you are successfully authenticated and ready to use the CLI.


## Logout

To logout, run the following command:

```bash
anyflow logout
```