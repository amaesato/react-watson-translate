const express = require('express');
const app = express();

app.get('/api/hello', function(req, res) {
  res.json({ message: 'hello world' });
});

app.listen(8080, function() {
  console.log('server listening on port 8080');
});
