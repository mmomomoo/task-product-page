import express from 'express';
import { connect } from './schemas/index.js';
import router from './routers/products.router.js';

// MongoDB 연결
connect();

const app = express();
const PORT = 6000;

app.use(express.json());

// /api 경로에 라우터를 사용합니다.
app.use('/api', router);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
