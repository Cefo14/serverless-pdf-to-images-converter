import path from 'path';
import dotenv from 'dotenv';

const envPath = path.join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

import Pipeline from './Pipeline';
import performance from './utils/performance';
import input from './inputs/input.pdf.to.png.json';

(async () => {
  const pipeline = new Pipeline(input);
  const response = await performance(pipeline.exec(), 'pipeline');
  console.log(JSON.stringify(response, null, 2));
})();
