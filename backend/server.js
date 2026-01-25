require("dotenv").config();

const database = require("./src/db.js");
const server = require("./src/app.js");

const PORT = process.env.PORT || 8080;

database.authenticate()
  .then(() => console.log("✅ Conexión a la base de datos exitosa"))
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
    console.log(
      "💡 Revisa las credenciales de conexión en el archivo .env y configuracion SSL"
    );
  });

database.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de datos sincronizada');
    server.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al sincronizar la BD:', err.message);
    console.log('💡 Posibles causas:');
    console.log('   - DATABASE_URL incorrecta');
    console.log('   - Problemas de SSL');
    console.log('   - Credenciales inválidas');
  });

process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Excepción no capturada:', err);
});