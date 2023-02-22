import {connectDB} from './db.js'
import { port } from './config.js';
import app from './app.js';

connectDB();
app.listen(port, () => console.log('Esta vivo'))