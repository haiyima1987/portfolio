const path = require('path');
// get env
const env = process.env.NODE_ENV;
// define paths
const envPath = path.resolve(process.cwd(), `.env.${env}`);
// initialize
require('dotenv').config({path: envPath});
