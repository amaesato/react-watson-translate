const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const t = require('./controller.js');

const app = express();
app.use(express.static(`${__dirname}/client/app.js`));
app.use(bodyParser.json());
app.use(cors());

app.get('/api', t.getLanguages);
app.post('/api/translate', t.translate);

app.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});
