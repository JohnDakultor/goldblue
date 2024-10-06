import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import methodOverride from 'method-override';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';
import './config/envConfig.js';
import './config/passportConfig.js'; // Ensure passport configuration is loaded

// import {AccumulationManager} from './services/autoAccumulation.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();

const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

const whitelist = process.env.WHITELISTED_DOMAINS ? process.env.WHITELISTED_DOMAINS.split(',') : [];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('__method'));



app.use('/api', authRoutes);

console.log("Database Password:", typeof process.env.DB_PASSWORD);



// app.post('/auotoAccumulation/signal', (req, res) => {
//   const { action } = req.body;

//   if (action === 'start') {
//     AccumulationManager.addJobToQueue(); // Add a job to the queue
//     AccumulationManager.startAccumulation(); // Start the accumulation process if not already started
//     res.status(200).send({ message: 'Accumulation started' });
//   } else if (action === 'stop') {
//     AccumulationManager.stopAccumulation(); // Clear the queue to stop accumulation
//     res.status(200).send({ message: 'Accumulation stopped' });
//   } else {
//     res.status(400).send({ message: 'Invalid action' });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

export default app;
