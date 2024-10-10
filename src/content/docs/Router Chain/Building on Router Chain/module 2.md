---
title: Module 2 - Basics Installations
description: Get Started with Router Academy.
---

## Why Rust & CosmWasm?

The Router Chain is built using the Cosmos SDK and encapsulates all the features of Cosmos, including fast Block Times, Robust Security Mechanisms, and, most importantly, CosmWasm - a Security-first Smart Contract Platform.

For interacting with CosmWasm & Writing Smart Contracts, one needs to have a Basic Understanding of Rust.

## Installations

### Windows

For Smooth Experience of Installation in Windows it is better if you have `wsl` Installed. Run the Below Command, if you don't have it - 

```bash
wsl --install
```

- Now, Click [here](https://www.rust-lang.org/tools/install) to Install Rust via Terminal or `exe` file. It will Install Rustup, later on also [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html), which is Rust's Package Manager.

- Now, We'll be Installing CosmWasm by Directly Running the Below Commands -
  
```bash
rustup target add wasm32-unknown-unknown
```

```bash
cargo install cargo-generate --features vendored-openssl
```

```bash
cargo install cargo-run-script
```

- Lastly, We'll be needing [Docker](https://docs.docker.com/desktop/install/windows-install/) to Optimize Production Code and make the Binary Size of Compiled CosmWasm Contracts as Small as Possible, we use Rust-Optimizer, which uses Docker to work. 


### macOS

- Click [here](https://www.rust-lang.org/tools/install) to Install Rust. It will Install Rustup, later on also Download [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html), which is Rust's Package Manager.

- Now, We'll be Installing CosmWasm by Directly Running the Below Commands -

```bash
rustup target add wasm32-unknown-unknown
```

```bash
cargo install cargo-generate --features vendored-openssl
```

```bash
cargo install cargo-run-script
```

- Lastly, We'll be needing Docker to Optimize the Production Code and make the Binary Size of Compiled CosmWasm Contracts as Small as Possible, we use Rust-Optimizer, which uses Docker to work. To Install it, first Install [HomeBrew](https://brew.sh/) and then Run -

```bash
brew install --cask docker
```

### Linux

- Click [here](https://www.rust-lang.org/tools/install) to Install Rust. It will Install Rustup, later on also Download [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html), which is Rust's Package Manager.

- Now, We'll be Installing CosmWasm by Directly Running the Below Commands -

```bash
rustup target add wasm32-unknown-unknown
```

```bash
cargo install cargo-generate --features vendored-openssl
```

```bash
cargo install cargo-run-script
```

- Lastly, We'll be needing Docker to Optimize the Production Code and make the Binary Size of Compiled CosmWasm Contracts as Small as Possible, we use Rust-Optimizer, which uses Docker to work. To Install it, first Install [HomeBrew](https://brew.sh/) and then Run -

```bash
brew install --cask docker
```