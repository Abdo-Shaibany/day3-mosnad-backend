import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './src/middleware/logger';
import notFound from './src/middleware/not-found';
import cors from 'cors';

import auth from './src/routes/auth';
import images from './src/routes/images';
import posts from './src/routes/posts';

const port = process.env['PORT'] || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser middleware
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', auth);
app.use('/api/images', images);
app.use('/api/posts', posts);


app.use(notFound);

// Set up a route for file uploads

app.listen(port, () => console.log(`server is running on port ${port}`));
