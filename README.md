
# Crypto Tracker

This project is a cryptocurrency tracking application that allows you to monitor live prices of various cryptocurrencies.

## How to Run the Project

### 1. Clone the Repository
Clone the repository to your local machine using the following command:
```bash
git clone https://github.com/Saurav1209/crypto-tracker.git
```

### 2. Navigate to the Project Directory
Change to the project directory:
```bash
cd crypto-tracker
```

### 3. Install Dependencies
Install the required dependencies:
```bash
npm install
```

### 4. Run the Application
To run the application in development mode, use `nodemon` for automatic server restarts. If you don't have `nodemon` installed globally, you can run it using `npx`:
```bash
npx nodemon index.js
```

Alternatively, if you have `nodemon` installed globally, you can run:
```bash
nodemon index.js
```

This will start the server, and you can access the application locally.

### 5. Access the Application
Once the server is running, open your browser and go to:
```
http://localhost:3000
http://localhost:3000/stats?coin={coin}
http://localhost:3000/deviation?coin={coin}
```
*(Replace `3000` with the appropriate port if different)*

### 6. Stopping the Application
To stop the server, press `Ctrl+C` in your terminal.
