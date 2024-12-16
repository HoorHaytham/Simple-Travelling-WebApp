# 🌍 Simple Travelling Website 

## Project Overview
The objective of the project is to build a local **client-server web application** that allows users to explore travel destinations, create accounts, and add destinations to their "want-to-go list".

---

## 🛠️ Technologies Used
- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing user and destination data
- **EJS (Embedded JavaScript)**: Template engine for rendering dynamic HTML
- **Express-Session**: For managing user sessions

---

## 🌟 Features

### 1. **User Registration**
  - Users can sign up with a unique username and password. Invalid entries show error messages. Successful registration redirects to the login page.

### 2. **User Login**
  - Registered users can log in with their credentials. Incorrect login details display an error message. Successful login redirects to the home page.

### 3. **Home Page**
  - After logging in, users see destination categories and can access their "want-to-go list."

### 4. **Category Page**
  - Displays destinations within a specific category. Clicking a destination redirects to its detail page.

### 5. **Destination Page**
  - Shows the destination description and an embedded video. Users can add destinations to their "want-to-go list," with error messages for duplicates.

### 6. **Want-to-Go List Page**
  - Displays destinations users have added to their list, accessible from the home page.

### 7. **Search Functionality**
  - A search bar matches destination names. Clickable results direct to the destination page, or a "Not found" message appears.

---

## 🖥️ Setup and Installation

### Prerequisites:
- **Node.js**: [Download Node.js](https://nodejs.org/en/download/)
- **MongoDB**: [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)
- **Visual Studio Code (VS Code)** – A recommended IDE for development [Download here](https://code.visualstudio.com/).

### Steps:
1. Navigate to the project directory 
2. Install dependencies
3. Start MongoDB: Ensure MongoDB is running on your system (use MongoDB Compass or the MongoDB shell).
4. Start the server
5. Access the web app: Open your browser and go to http://localhost:3003 to use the website
   
