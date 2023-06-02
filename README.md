<h1 align="center">Wagademy</h1>

## About

The Wagademy App is an innovative social network that utilizes the Lens Protocol to redefine the way we interact with social media and personal data. By leveraging the Lens Protocol, this app introduces a new paradigm that prioritizes user control, privacy, and security. With Wagademy, users can enjoy a more personalized and empowering social networking experience.

This innovative social network offers a transformative approach to social media and personal data. Through its Unique Profile, Apply to Jobs feature, Join Working Groups functionality, Follow Relevant People option, and the ability to Get NFT Certificates, this app revolutionizes the way we engage with digital identities, connect with others, and explore our creative potential. Emphasizing user control, trust, and transparency, this app strives to create a more equitable and secure digital world for all its users.

This project was generated using
[![Nx](https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white)]

## Repository structure

Wagademy codebase is structured a Monorepo. The repository is organized in folders, separated as follows:

- **Api**
- **Api-e2e**
- **Backoffice**
- **Backoffice-e2e**
- **Frontend**
- **Frontend-e2e**

<h1 align="center">Wagademy API</h1>

## Description

Folder: **Api**

Wagademy Back end is an API with services for squads and IPFS. The Backend uses IPFS to upload media and posts, while the squad service performs processes for users to join groups.

## :computer: System requirements

[![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](<(https://www.typescriptlang.org/docs/)>)
[![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)](<(https://nodejs.org/en//)>)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](<(https://nestjs.com/)>)
[![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](<(https://aws.amazon.com/)>)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](<(https://www.mongodb.com/)>)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](<(https://www.prisma.io/)>)

## :rocket: How to install

1. Create an .env file within the project and add the information:

```sh
DATABASE_URL=''
MY_NAMESPACE=''
API_KEY=''
API_SECRET=''
```

| Definition       | Description               |
| ---------------- | ------------------------- |
| **DATABASE_URL** | Mongodb connection string |
| **MY_NAMESPACE** |                           |
| **API_KEY**      |                           |
| **API_SECRET**   |                           |

## Running the API

2. Access the project directory and run the commands below.

```sh
$ yarn install
```

- **Development:**

```sh
$ yarn api
```

<h1 align="center">Wagademy frontend</h1>

## Description

Folder: **Frontend**

The Wagademy frontend is the folder that contains the graphical user interface for the app. It was developed with angular, typescript and tailwind. The frontend makes the communication with API Lens to use your protocol.

One of the standout features of this Wagademy app is the Unique Profile. Users can showcase their skills, interests, achievements, enabling a understanding of who they are in the digital realm.

Users can explore job opportunities within the network's ecosystem and submit applications directly through the platform. This streamlined process helps employers identify talented individuals based on their unique profiles and qualifications.

The users can also Join Working Groups on this social network, where bring together individuals with shared interests or professional goals, allowing for meaningful interactions and the exchange of ideas.

With the Follow Relevant People feature, users can stay connected with thought leaders, influences, experts, and other individuals of interest within their respective fields.

The wagademy app embraces the growing trend of non-fungible tokens (NFTs) by offering users the ability to Get NFT Certificates. These certificates provide digital proof of ownership for unique digital assets.

## About Lens Protocol

The Lens Protocol is a technology framework designed to enhance user control, privacy, and security in the management and utilization of personal data. It aims to revolutionize the way personal data is handled in digital platforms, including social networks and applications. The protocol provides a set of guidelines and practices that prioritize user consent, transparency, and data ownership.

Key features of the frontend in connection with the lens protocol:

1. **Unique Profile**: Wagademy allows users to create a unique and dynamic digital identity. Users can showcase their interests, skills, accomplishments, and more, enabling a more comprehensive representation of themselves within the app.

2. **Enhanced Privacy**: With the Lens Protocol, Wagademy prioritizes user privacy. Users have full control over the visibility of their profile and data, ensuring that only the desired information is shared with others.

3. **Secure Data Management**: The Lens Protocol ensures that user data is encrypted and securely stored, minimizing the risk of unauthorized access or data breaches. This focus on data security enhances user confidence and trust within the Wagademy community.

4. **Community Engagement**: Users can engage with other like-minded individuals through features such as group discussions, private messaging, and collaborative projects. This fosters meaningful connections and facilitates knowledge sharing within the Wagademy community.

5. **Personalized Content**: Leveraging the Lens Protocol's advanced algorithms, the app delivers personalized content tailored to each user's preferences and interests. This ensures a highly engaging and relevant user experience, with content that truly resonates with the individual.

## :computer: System requirements

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](<(https://www.typescriptlang.org/docs/)>)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](<(https://html.com/document/)>)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](<(https://angular.io/docs)>)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](<(https://jestjs.io/)>)
<a href="https://lenster.xyz/u/yoginth">
<img src="https://lens-badge.vercel.app/api/badge/yoginth.lens" alt="Lens">
</a>

1. Access the project directory and run the commands below.

```sh
$ yarn install
```

- **Development:**

```sh
$ yarn start
```

## Running unit tests

Run `yarn test` to execute the unit tests via [Jest](https://jestjs.io).
