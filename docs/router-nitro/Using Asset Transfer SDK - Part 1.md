---
sidebar_position: 10
---

# Module 10: Using Asset Transfer SDK - Part 1

Welcome to Module 10 of the Router Nitro Cookbook. This Module focuses on Utilizing the Asset Transfer SDK of Router Protocol. This SDK, available as an <code>npm</code> Package, Streamlines Asset Swapping between Blockchains. By installing the Package and importing required Libraries, you can Seamlessly Transfer Assets across Different Blockchains.

Prior to diving into SDK usage, let's establish our initial Environment and install all necessary Libraries and Tools.

## Step 1: Setting up the Project

To begin, open your preferred Code Editor. We'll be using VS Code for this Tutorial. Next, ensure you have <code>NodeJS</code> installed. You can Download it from [here](https://nodejs.org/en/download.)
Once <code>NodeJS</code> is installed, verify its installation by running <code>node -v</code> and <code>npm -v</code> in your Terminal. After Confirming NodeJS is set up Properly, Open VS Code and proceed with the following Steps.

**Create a Project Directory:**

1. Navigate to your Desired Workspace Directory and Create a new Directory for your Project using the <code>mkdir</code> Command and <code>cd</code> to that directory -

```
mkdir my-nitro-project
cd my-nitro-project
```

2. Initialize a <code>package.json</code> file, which will Manage your Project's Dependencies, using Yarn -

```
yarn init -y
```

3. Install TypeScript as a Development Dependency using Yarn -

```
yarn add -D typescript
```

4. Generate a Basic TypeScript Configuration file using the TypeScript Compiler -

```
yarn tsc --init
```

This creates a <code>tsconfig.json</code> file at the Root of your Project. It defines Compiler Options for how TypeScript code will be Transpiled to JavaScript.

5. Create a New file for your Application code with a <code>.ts</code> Extension (e.g., index.ts) -

```
touch index.ts
```

6. Since TypeScript Code needs to be Compiled to JavaScript before <code>NodeJS</code> can Execute it, you'll use the ts-node Package for Development -

Install <code>ts-node</code> as a Development Dependency:

```
yarn add -D ts-node
```

7. Install the Latest Version of Asset Transfer SDK -

```
yarn add @routerprotocol/asset-transfer-sdk-ts
```

## Share Your Learnings!

![img](https://github.com/router-resources/Router-Nitro-CookBook/assets/124175970/23258532-0dfa-407e-b695-2ed2eb39d1bc)

_Share your learnings on Twitter. Click [here](https://clicktotweet.com/1Jp38)_
