const tf = require("@tensorflow/tfjs-node");
const tfConverter = require("@tensorflow/tfjs-converter");
const fs = require("fs");

// Paths to your shard files
const shardPaths = [
  "../model/group1-shard1of4",
  "../model/group1-shard2of4",
  "../model/group1-shard3of4",
  "../model/group1-shard4of4",
];

const outputPath = "../model";

// Load the shard files
const shards = shardPaths.map((path) =>
  tf.node.decodeBinary(fs.readFileSync(path))
);

// Create a buffer for the merged model
const mergedModelBuffer = Buffer.concat(shards);

// Save the merged model to the output path
fs.writeFileSync(outputPath, mergedModelBuffer);

console.log("Model conversion complete");
