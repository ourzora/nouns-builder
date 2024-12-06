# Nouns Builder Subgraph

## Getting Started

👉 [Read the Goldsky docs](https://docs.goldsky.com/subgraphs/deploying-subgraphs)

The Nouns Builder subgraph supports four networks:

- `ethereum`
- `ethereum-sepolia`
- `base`
- `optimism`
- `zora`

### Step 1 - Install Dependencies

Navigate to the subgraph directory and run:

```bash
# FROM: ./apps/subgraph
pnpm install
```

### Step 2 - Set Up a Personal Goldsky API Key

1. Request to join the team account at [goldsky.com](https://goldsky.com).
2. Create an API key on your Settings page.
3. Install the Goldsky CLI:
   ```bash
   curl https://goldsky.com | sh
   ```

### Step 3 - Log in with the API Key

Use the API key you created:

```bash
# FROM: ./apps/subgraph
goldsky login
```

### Step 4 - Build the Subgraph from Source

Run the following commands (these scripts are defined in `package.json`):

```bash
# FROM: ./apps/subgraph
pnpm prepare:<desired network>
pnpm codegen
pnpm build:subgraph
```

This will generate types, build the subgraph, and create a local `subgraph.yaml` file.

### Step 5 - Deploy the Subgraph to Production

#### IMPORTANT:

**To avoid downtime during upgrades, maintain a backup subgraph. If issues arise, you can redirect traffic to the backup rather than waiting for redeployment or rollback, which can take hours.**

- The subgraph name follows the pattern `nouns-builder-<network>`, so clients won’t need to update their URI for minor version changes.
- Increase the `specVersion` at the top of `subgraph.yaml.mustache` for each new version.
- Use the **--tag** flag to alias `latest` with the current `specVersion`.

**Always remember to tag!**

```bash
# FROM: ./apps/subgraph
# Example with specVersion 0.0.6

goldsky subgraph deploy nouns-builder-<network>/0.0.6 --path .
goldsky subgraph tag create nouns-builder-<network>/0.0.6 --tag latest
# API endpoint format: api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-ethereum-sepolia/latest/gn
```

### Step 6 - Query the Subgraph

You can now query the subgraph in the Goldsky GraphQL playground to test your changes. **Note: Full indexing may take several hours.**

## Production Endpoints

The subgraph is currently deployed to the following networks:

- [Ethereum](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-ethereum-mainnet/latest/gn)
- [Base](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-base-mainnet/latest/gn)
- [Optimism](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-optimism-mainnet/latest/gn)
- [Zora](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-zora-mainnet/latest/gn)
- [Ethereum Sepolia](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-ethereum-sepolia/latest/gn)
- TODO?: [Optimism Sepolia](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-optimism-sepolia/latest/gn)
- TODO?: [Zora Sepolia](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-zora-sepolia/latest/gn)
- TODO?: [Base Sepolia](https://api.goldsky.com/api/public/<project name>/subgraphs/nouns-builder-base-sepolia/latest/gn)

## Local Development with Docker Compose

- Generate types with `pnpm codegen`
- Build the subgraph with `pnpm build:subgraph`
- Run the local graph node with `pnpm local-node`
- For Mac users on Apple Silicon, use a local image of `graphprotocol/graph-node` (see [instructions here](https://github.com/graphprotocol/graph-node/tree/master/docker)).
- Create the local subgraph with `pnpm create-local`
- Deploy changes to the local subgraph with `pnpm deploy-local`
