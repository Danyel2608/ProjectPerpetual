// importar los módulo express y mongoose
const express = require("express");
const dotenv=require("dotenv")
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const cors=require("cors");
//obtener la informacion del archivo .env
const logins = require("./Routes/loginRoutes");
const dates = require("./Routes/datesRoutes");

dotenv.config();
// La función express() exportada por el módulo express crea una aplicación Express.
const app = express();
// Analiza las solicitudes que contienen archivos json
app.use(express.json());
app.use(cors())

//conectar con la base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
}).then(()=>console.log("Succesfully connected to the database")).catch((err)=>console.log(err))
//guardar conexion en una constante
const db = mongoose.connection;

//verificar si la conexion ha sido exitosa
mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.use("/auth", logins);
app.use("/dates", dates);

app.listen(process.env.PORT, () => {
  // función callback que se ejecutará cuando el servidor esté listo
  console.log(`Server running on port ${process.env.PORT}`);
});


