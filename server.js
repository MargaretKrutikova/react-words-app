import config from './config';
import express from 'express';

const server = express();

server.use(express.static('public'));
server.set('view engine', 'ejs');

server.get('/', (req, res) => {
  res.render('index');
});

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});