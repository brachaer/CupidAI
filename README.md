# CupidAI - Matchmaking App - Server
## Created using NodeJs, Express, MongoDB, OpenAI API

CupidAI is an innovative matchmaking app that leverages user self-depiction and the powerful OpenAI API to find the ideal partner.
This project comprises two distinct components: the server and the client. The server seamlessly manages user data using MongoDB and
orchestrates matchmaking through the OpenAI API. On the other hand, the client offers an intuitive and engaging user interface,
crafted with React Native, for users to interact with the app.

CupidAI invites users to share their email and a personal description. Utilizing the OpenAI API, the app paints a vivid picture of the
user's perfect romantic match, complete with imaginative suggestions for potential meeting places such as bars, universities, coffee shops, and more.
Going beyond conventional matchmaking, CupidAI also explores the intriguing concept of connecting users based on past depictions, 
aiming for an impressive 70% compatibility match with another individual's email. Welcome to CupidAI, where technology meets the art of meaningful connections.


![Screenshot 2024-02-08 103823](https://github.com/brachaer/CupidAI/assets/145331020/4c85c5aa-252b-4eb6-a4b0-c9e65c5a7f5b)

## Getting Started
#### Before running the application, ensure that you've set up the server and client environments. 
#### This repository contains the server code. 
#### Once you've completed the setup here, proceed to the client repository for the next steps in the process.
#### You will need a MongoDB connection string and an OpenAI API key.
### 1. Clone the repository:
      git clone <repository-url>
### 2.	Open terminal from server folder.
### 3.	Install server dependencies:
      npm install
### 4.	Create a .env file in the root of the server project with the following content:
      PORT=8080
      OPENAI_API_KEY =your-api-key
      CONN=your-mongodb-connection-string 
### 5.	Run server:
      npm start
### 6.	Follow with [Client Repository](https://github.com/brachaer/CupidAIClient)
<br/>

### Configuration Note
**Make sure your client is running on the same port as specified in the server's CORS configuration.**

## Running the Application
With both the server and client running, you can access the CupidAI app on your mobile device or emulator.

## Usage
Open the CupidAI app on your device.
Create a user profile by providing your email, self-depiction, and ideal partner preferences.
Find your match by clicking the "Find Your Match" button.
View your ideal match's information and suggested locations to meet.
