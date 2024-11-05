# Phonebook Application
A Node.js application for managing a phonebook. This application includes a RESTful API that allows users to add, view, update, and delete phonebook entries. It also includes a route that displays general information, like the current number of entries and request timestamp.

## Features:
```
Create: Add new phonebook entries with unique IDs.
Read: View all entries or individual entries by ID.
Update: Modify existing phonebook entries.
Delete: Remove entries from the phonebook.
Info Route: Get information on the total entries and request time at /info.
```

## Technologies:
Node.js: JavaScript runtime environment.
Express: Web framework for Node.js.
MongoDB: NoSQL database to store phonebook entries.
Mongoose: MongoDB object modeling for Node.js.
Morgan: HTTP request logger middleware for Node.js.

## Installation
Clone the repository:

Copy code
```
git clone https://github.com/your-username/phonebook-app.git
cd phonebook-app
```
Install dependencies:

Copy code
```
npm install
```
Setup MongoDB:

Make sure MongoDB is running locally or provide a remote MongoDB URI.
Create a .env file in the root of the project and add your MongoDB URI:
env
Copy code
```
MONGODB_URI=your_mongodb_uri
```
Start the application:

Run in development mode with automatic restarts:

Copy code
```
npm run dev
```
Run in production mode:

Copy code
```
npm start
```
