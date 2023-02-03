<div align="center">
     <img src="https://raw.githubusercontent.com/cborac/Silica-Framework/main/assets/logo.png">
     <h1>Silica Bot Framework</h1>
</div>

<p align="center">
     <a href="#"><img alt="Node 16.0.0" src="https://img.shields.io/badge/node-%3E%3D%2016.0.0-success?style=for-the-badge"></a>
     <a href="#"><img alt="Written In TypeScript" src="https://img.shields.io/badge/TypeScript-%3E%3D%204.3.0-blue?style=for-the-badge"></a>
     <a href="LICENSE"><img alt="License" src="https://img.shields.io/github/license/cborac/Silica-Framework?style=for-the-badge&a"></a>
     <a href="#"><img alt="Last Commit" src="https://img.shields.io/github/last-commit/cborac/Silica-Framework?style=for-the-badge&a"></a>
</p>

* 🤖 Easy to implement interactions
* 🌟 Type-safe modals and interaction responses
* 📂 Pino logging
* 🪶 Built with discord.js

<br>

A top-notch bot development solution, crafted with a focus on a single Discord guild. This framework prioritizes type-safety, utilizing TypeScript as its programming language to guarantee secure and error-free code. By focusing on just one guild, the framework offers specialized and optimized functionality, custom-fit to the unique needs of that particular community.


# Setup

## Using `create-silica-bot`

- ✨ Coming Soon ✨

## Manual

1. Clone the repository

```sh
$ git clone https://github.com/cborac/Silica-Framework.git
```

2. Install the node modules

```sh
# yarn
$ yarn install

# npm
$ npm install
```

3. Copy `.env.example` to `.env` and fill in the variables

4. Run `sync` script to generate Prisma Client

5. Done!

# Requirments
* Node v16 or above
* TypeScript 4.7.0 or above

# Warning

- You shouldn't use `-` in interaction names (it is used by the framework to distinguish data sent)
- pino-pretty is enabled only in development environment due to performance issues