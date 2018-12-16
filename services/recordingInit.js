const fs = require('fs');
const moment = require('moment');

let recording = [];
module.exports.init = () => {
  fs.readdir('audio', (err, files) => {
    if (files.length) {
      // node restarted, and we have WAV files.
      files.forEach((file) => {
        const audio = {
          name: file,
          creationDate: moment(parseInt(file.substring(10, 23 ))).format("LLL"),
          duration: moment(parseInt(file.substring(38)) - parseInt(file.substring(24))).format("mm:ss")
        };
        recording.push(audio)
      })
    }
  });
};

module.exports.getRecordingArray = recording;



