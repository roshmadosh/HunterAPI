import createApp from './server';
import DAO from './db';

const app = createApp(DAO);

app.listen(process.env.PORT, () => {
  console.log(`Listening in ${process.env.NODE_ENV} on port ${process.env.PORT}`)
});