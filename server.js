const path = require('path');
const express = require('express');
const moment = require('moment');
const http = require('http');
const socketIO = require('socket.io');
const app = express();

const upload = require('./services/multerStorage');
require('./services/recordingInit').init();
const recording = require('./services/recordingInit').getRecordingArray;

app.use('/recordings', express.static(path.join(__dirname, 'dist', 'MyndYouTask')));
app.use('/static', express.static(path.join(__dirname, 'audio')));
app.use(express.static(path.join(__dirname, 'client')));

const server = http.createServer(app);
const io = socketIO(server);


// upload audio file.
app.post('/data', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // handle error, let user know that uploading failed.
      res.status(500).json({
        message: 'Unable to upload file to the server',
        error: err
      })
    } else {
      // push file name to "recording array".
      const audio = {
        name: req.file.filename,
        creationDate: moment(moment().valueOf()).format("LLL"),
        duration: moment(req.query.endTime - req.query.startTime).format("mm:ss")
      };
      recording.push(audio);
      res.json({records: recording})
    }
  })
});

app.get('/AllRecords', (req, res) => {
  res.json({
    records: recording
  })
});

// listen to socket from client.
io.on('connection', (socket) => {
  socket.on('sensorsData', (data) => {
    console.log(data);
  });
  socket.on('freqData', (data) => {
    console.log(data);
  });
  socket.on('timesData', (data) => {
    console.log(data);
  });
});

const port = process.env.PORT || 3002;

server.listen(port, () => {
  console.log(`app listen on post ${port}`);
});

