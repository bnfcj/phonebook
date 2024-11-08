const { PORT } = require('./config/envConfig');
const app = require('./app');
const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
