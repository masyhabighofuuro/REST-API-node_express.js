const express = require('express');
const app = express();
const PORT = 3006;
const router = require('./router/router');
const userRouter = require('./router/userRouter');
const error = require('./middleware/errorHandler');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

//Penerapan routing app.use
app.use('/', router);

//Penerapan routing app.use user
app.use('/users', userRouter);

//Penerapan middleware errorHandler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});