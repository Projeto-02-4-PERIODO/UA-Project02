import express from 'express';
import router from './src/app';

const app = express();

app.use(express.json());
app.use(router);

app.listen(7000, () => {
  console.log('Server started on http://localhost:7000');
});
