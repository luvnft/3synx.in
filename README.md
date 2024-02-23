# 3synx.in

 SynX aims to make profitable investments, which are inherently out of reach for many, accessible, by tokenizing real-world assets, leveraging Solana's powerful ecosystem. The world of agriculture will be starting point, because I've gagued the market and found interesting needs. 

In Argentina, people have the perception that owning farmland is a good investment (they are not wrong), and talk about it as if it was not possible. 60,000 producers are in charge of a legacy system that is looking for new solutions to new problems, and, of course, more capital. Now, tokenizing a real world asset is delicate, but there already proven cases of success, and we are treading uncharted waters. Initially, SynX will target this reserved market, with the goal of onboarding producers to sell (or stake) their tokenized land on the Solana blockchain. The increased access to capital is bound to improve the quality of their production and to bring value to producers, investors and of course, Solana. 

### MVP: 

A platform that allows Real World Asset (RWAs) owners to 'tokenize' assets and provides
a secure, decentralized marketplace.

## Solana Programs

This project is generated with the [create-solana-dapp](https://github.com/solana-developers/create-solana-dapp) generator.

* Write custom programs in the ```/programs``` directory. Init with ```anchor init <name>```
    * Run ```anchor build``` and ```anchor deploy``` to delpoy to the configured environment
    * You can check your current env using ```solana config get```

## Solana Program Tests:

* This is the most efficient way to interact with solana programs and are defined in the ```./tests/**``` directory.
* Tests interact with the program by importing its type from the ```target``` directory generated by ```anchor build``` -> ```import { Synx } from "../target/types/synx";```
* Do not forget to TDD, TDD, TDD

* ```anchor test``` -> Troubleshoot:
     -check solana-test-validator status:
    - it needs to be on for delpoyment
    - it needs to be off for tests to run (anchor test) or run in a different port
* Make sure the following environment variables are available for local test runs:
  - export ANCHOR_PROVIDER_URL=http://127.0.0.1:8899
  - export ANCHOR_WALLET=~/.config/solana/id.json



## Getting Started

### Prerequisites

- Node v18.18.0 or higher

- Rust v1.70.0 or higher
- Anchor CLI 0.29.0 or higher
- Solana CLI 1.17.0 or higher

### Installation

#### Clone the repo

```shell
git clone <repo-url>
cd <repo-name>
```

#### Install Dependencies

```shell
npm run install
```

#### Start the web app

```
npm run dev
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the command with `npm run`, eg: `npm run anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/counter-exports.ts` to match the new program id.

```shell
npm run anchor keys sync
```

#### Build the program:

```shell
npm run anchor-build
```

#### Start the test validator with the program deployed:

```shell
npm run anchor-localnet
```

#### Run the tests

```shell
npm run anchor-test
```

#### Deploy to Devnet

```shell
npm run anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
npm run dev
```

Build the web app

```shell
npm run build
```
