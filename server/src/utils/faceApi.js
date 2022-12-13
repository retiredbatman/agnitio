const { parentPort, workerData } = require('worker_threads');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs/promises');
const faceapi = require('@vladmandic/face-api/dist/face-api.node.js');

// require('@tensorflow/tfjs-node');
const path = require('path');

const { filePath } = workerData;
console.log('here');

const LoadModels = async () => {
  // Load the models
  // __dirname gives the root directory of the server
  await faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname + '/../../public/models'));
  await faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname + '/../../public/models'));
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname + '/../../public/models'));
};

function getPhotoTensor(pathPhoto) {
  return fs.readFile(pathPhoto).then(buffer => {
    return tf.node.decodeImage(new Uint8Array(buffer));
  });
}

const detect = async () => {
  //const img = await canvas.loadImage(filePath);
  try {
    const input = await getPhotoTensor(filePath);
    faceapi
      .detectAllFaces(input)
      .then(detections => {
        parentPort.postMessage({
          detections,
        });
        return detections;
      })
      .catch(err => console.error(err));
  } catch (err) {
    console.log(err);
  }
};

LoadModels().then(() => detect());
