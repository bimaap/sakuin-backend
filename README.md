# Sakuin E-wallet Backend
## About 
A backend program for Sakuin E-wallet

## CRUD database for:
- auth
- users
- transaction

## Build with
- [Node js](https://nodejs.org)
- [Express js](https://expressjs.com/)
- [Prisma js](https://www.prisma.io/)


## How to run app?
1. Clone this project to your local computer
2. You can manage the database by looking at its structure in schema.prisma and then applying it in postgres.
3. Create .env file and fill the data like in .env.example
4. Install required package with command `npm i`
5. Run the app with `npm run dev`

## Main Endpoint

| url        | Method           | Description  |
| ------------- |:-------------:| -----:|
| /auth/login                | POST  | Login user |
| /auth/register             | POST  | Creat new user |
| /transactions/             | GET   | Get all data transaction |
| /transactions/:id          | GET   | Get data transaction by Id |
| /transactions/transfer/:id | POST  | Transaction transfer |
| /transactions/topup        | POST  | Transaction topup |
| /users/                    | GET   | Get all data users |
| /users/:id                 | GET   | Get data user by Id |
| /users/check/pin           | GET   | Get pin user |
| /users/patch/name          | patch | Patch name user  |
| /users/patch/phone         | patch | Patch phone number user |
| /users/patch/image         | patch | Patch image user |
| /users/patch/pin           | patch | Patch pin user |
| /users/patch/password      | patch | Patch password user |