import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect(
      'mongodb+srv://hwg0124:0kCmsi63VTMdsbIy@momomoo.q0ub4by.mongodb.net/?retryWrites=true&w=majority&appName=momomoo',
      {
        dbName: 'spa_mall', // spa_mall 데이터베이스명을 사용합니다.
      },
    )
    .then(() => console.log('몽고디비 연결 성공'))
    .catch((err) => console.log('몽고디비 연결 에러', err));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

const successSchemaDef = new mongoose.Schema({
  status: {
    type: Number,
  },
  message: {
    type: String,
  },
  data: {
    type: Object,
  },
});

const failureSchemaDef = new mongoose.Schema({
  status: {
    type: Number,
  },
  message: {
    type: String,
  },
});

const SuccessResponse = mongoose.model('SuccessResponse', successSchemaDef);
const FailureResponse = mongoose.model('FailureResponse', failureSchemaDef);

export { connect, SuccessResponse, FailureResponse };
