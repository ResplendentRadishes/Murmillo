# Murmillo

> Murmillo is a real-time competition-based programming platform where users can compete with one another on various coding challenges. Why not make learning more collaborative, competitive, and fun!

## Team

  - __Product Owner__: Vernon Quan
  - __Scrum Master__: Robert Littlejohn
  - __Development Team Members__: Nimmy Issac, Yoshi Oritatsu

## Table of Contents
1. [ArchitectureDiagram](#ArchitectureDiagram)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## ArchitectureDiagram
![screen shot 2017-01-20 at 9 08 30 am](https://cloud.githubusercontent.com/assets/20877349/22158223/17b1e1de-def0-11e6-9c82-ef0110362211.png)

## Requirements
- Node 6.9.1
- NPM 3.10.8
- Docker 1.12.5
- MySQL 
- See Package.json for other frameworks and libraries used

## Development
### Installing Dependencies
From within the root directory:
```sh
npm install
```
### Initialize MySQL database with predefined data
From within the root directory:
```sh
npm run dbinit
```
### Start a Main Server 
From within the root directory:
```sh
node server/index.js
```

### Start Code Check Server (use Docker container)
You need Docker to start a server that handles evaluating code
```sh
cd server/docker/codeCheck
npm run build-image
npm run container
```

### Roadmap
View the project roadmap [here](https://github.com/ResplendentRadishes/Murmillo/issues)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


