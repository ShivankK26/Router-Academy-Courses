---
sidebar_position: 10
---

# Module 10: Using Asset Transfer SDK - Part 1

Welcome to Module 10 of the Router Nitro Cookbook. This module focuses on utilizing the Asset Transfer SDK of Router Protocol. This SDK, available as an npm package, streamlines asset swapping between blockchains. By installing the package and importing required libraries, you can seamlessly transfer assets across different blockchains.

Prior to diving into SDK usage, let's establish our initial environment and install all necessary libraries and tools.

## Step 1: Setting up the project

To begin, open your preferred code editor. I'll be using VS Code for this tutorial. Next, ensure you have Node.js installed. You can download it from [here](https://nodejs.org/en/download.)
Once Node.js is installed, verify its installation by running node -v and npm -v in your terminal. After confirming Node.js is set up properly, open VS Code and proceed with the following steps.

**Create a Project Directory:**

1. Navigate to your desired workspace directory and create a new directory for your project using the mkdir command and cd to that directory :

```
mkdir my-nitro-project
cd my-nitro-project
```

2. Initialize a package.json file, which will manage your project's dependencies, using Yarn:

```
yarn init -y
```

3. Install TypeScript as a development dependency using Yarn:

```
yarn add -D typescript
```

4. Generate a basic TypeScript configuration file using the TypeScript compiler:

```
yarn tsc --init
```

This creates a tsconfig.json file at the root of your project. It defines compiler options for how TypeScript code will be transpiled to JavaScript.

5. Create a new file for your application code with a .ts extension (e.g., index.ts):

```
touch index.ts
```

6. Since TypeScript code needs to be compiled to JavaScript before Node.js can execute it, you'll use the ts-node package for development:

Install ts-node as a development dependency:

```
yarn add -D ts-node
```

7. Install the latest version of Asset Transfer SDK :

```
yarn add @routerprotocol/asset-transfer-sdk-ts
```

## Share Your Learnings!

![img](https://github.com/router-resources/Router-Nitro-CookBook/assets/124175970/23258532-0dfa-407e-b695-2ed2eb39d1bc)

_Share your learnings on Twitter. Click [here](https://clicktotweet.com/1Jp38)_

# [ Next: Module 11: Using Asset Transfer SDK - Part 02 ](Module11.md)
