---
---

# AnyFlow MCP Installation

You are free to use the AnyFlow MCP without an API key. However, some features are only available with an API key.

To get your API key, log into the [AnyFlow Webapp](https://app.anyflow.pro/) and visit [API Keys](https://app.anyflow.pro/settings/api) section.

## How to Install AnyFlow MCP on Cursor IDE

### Step 1: Add AnyFlow MCP to Cursor IDE

Paste the following configuration into `Cursor Settings > MCP > Add new global MCP server`

```
{
  "mcpServers": {
    "anyflow": {
      "command": "npx",
      "args": [
        "-y",
        "supergateway",
        "--sse",
        "https://api.anyflow.pro/mcp/sse",
        "--oauth2Bearer",
        "YOUR_ANYFLOW_API_KEY"
      ]
    },
  }
}
```

### Step 2: Check if AnyFlow MCP is installed correctly

![AnyFlow MCP installed correctly](../img/mcp.png)

## How to Install AnyFlow MCP on Claude Desktop

TODO

## How to use AnyFlow MCP in ChatGPT

TODO
