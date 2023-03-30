import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import template from './../template';
import devBundle from './devBundle';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();

// comment out before building
devBundle.compile(app);


const CURRENT_WORKING_DIR = process.cwd();

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//routes
app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.status(200).send(template());
});

export default app;
