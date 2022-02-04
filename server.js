const app = require("./app")
const connectDatabase = require("./database/database")


// Handling Uncaught Exception error and sutting down server
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

//importing env file
const dotenv = require("dotenv")
dotenv.config({ path: "config/config.env" })

// database function
connectDatabase()

const server = app.listen(
    process.env.PORT,
    () => {
        console.log(`successfully started on port ${process.env.PORT}`)
    }
)

// Unhandled Promise Rejection error and shutting down server
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});