import app from "./app.js";
import { connectToDatabase, disconnectFromDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    app.listen(Number(PORT), () => {
      console.log("Server Up and Connected to Database");
    });
  })
  .catch((error) => {
    console.log(error);
  });