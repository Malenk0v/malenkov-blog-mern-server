import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validation.js';

import { UserController, PostController } from './controllers/index.js';
import { handleValidationsErrors, checkAuth } from './utils/index.js';

mongoose
  .connect(
    'mongodb+srv://admin:adminMD@cluster0.pxi1578.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log(err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post(
  '/auth/login',
  loginValidation,
  handleValidationsErrors,
  UserController.login
);
app.post(
  '/auth/register',
  registerValidation,
  handleValidationsErrors,
  UserController.register
);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
    success: true,
  });
});

app.get('/tags', PostController.getLastTags);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationsErrors,
  PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationsErrors,
  PostController.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server ok');
});
