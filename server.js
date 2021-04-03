const path = require('path');
const express = require('express');
const app = express();
const routes = require('./controllers');
const sequelize = require('./config/connection');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => {
    console.log('HTTP Listening on port 3001');
  });
});
