const app = require("./app");
const connect = require('./config/db');
const env = require('./config/envConfig');

//mongodb conection
connect();

const PORT = env.PORT || 8000;

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
