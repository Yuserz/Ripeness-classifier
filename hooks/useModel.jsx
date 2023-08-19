import * as ImageManipulator from "expo-image-manipulator";
import * as jpeg from "jpeg-js";
import * as FileSystem from "expo-file-system";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import { useState, useEffect } from "react";

const IMAGE_SIZE = 224;

/**
 * ```jsx
 * const { isLoaded, convertToTensor, predict } = useModel({model, weights, labels});
 * ```
 *
 * Returns the status of the model,
 * a function to convert an image to tensor,
 * and a function to make a prediction.
 *
 * @param model The json file of the model
 * @param weights The bin file of the weights
 * @param labels An array of labels for prediction
 */

export const useModel = ({ model, weights, labels }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tfModel, setModel] = useState("");

  // load model
  const loadModel = async () => {
    await tf.ready();

    const loadedModel = await tf.loadLayersModel(
      bundleResourceIO(model, weights)
    );

    setModel(loadedModel);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadModel();
  }, []);

  /**
   * ```jsx
   * const imageTensor = await convertToTensor(imageUri)
   * ```
   *
   * Returns the converted tensor of an image.
   *
   * @param imageUri A string of the uri/path of an image.
   */
  const convertToTensor = async (imageUri) => {
    // resize image to IMAGE_SIZE
    const resized = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: IMAGE_SIZE, height: IMAGE_SIZE } }],
      { format: ImageManipulator.SaveFormat.JPEG }
    );

    // convert image to base64
    const img64 = await FileSystem.readAsStringAsync(resized.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // get image buffer and convert to uint8 array
    const imgBuffer = tf.util.encodeString(img64, "base64").buffer;
    const raw = new Uint8Array(imgBuffer);

    // convert the raw data to jpeg data
    const jpegData = jpeg.decode(raw, true); // 'true' for JPEG with alpha (transparency)

    // create a template array with size IMAGE_SIZE * IMAGE_SIZE * 3 (rgb channels)
    const rgbImageArray = new Uint8Array(jpegData.width * jpegData.height * 3);

    // place the raw data to template array matching its rgb channels
    for (let i = 0; i < jpegData.data.length; i += 4) {
      rgbImageArray[(i / 4) * 3] = jpegData.data[i]; // Red channel
      rgbImageArray[(i / 4) * 3 + 1] = jpegData.data[i + 1]; // Green channel
      rgbImageArray[(i / 4) * 3 + 2] = jpegData.data[i + 2]; // Blue channel
    }

    // flatten the array and convert to image tensor
    const flattenedArray = Array.from(rgbImageArray);
    const imageTensor = tf.tensor(
      flattenedArray,
      [1, IMAGE_SIZE, IMAGE_SIZE, 3],
      "float32"
    );

    return imageTensor;
  };

  /**
   * ```jsx
   * const result = await predict(imageTensor)
   * ```
   *
   * Returns a result of the prediction and its accuracy.
   *
   * @param imageTensor A tensor that will be used to predict
   */
  const predict = async (imageTensor) => {
    // check if model is loaded
    if (!tfModel) return;

    // normalize tensor to 0-1 by dividing to 255.0
    const normalized = tf.div(imageTensor, 255.0);
    // create prediction
    const result = tfModel.predict(normalized);
    // get the array of predictions
    const predictions = Array.from(result.dataSync());
    // find the highest accuracy from the predictions and get its index
    const highestAccuracy = Math.max(...predictions);
    const index = predictions.findIndex((val) => val === highestAccuracy);
    const percent = (highestAccuracy * 100).toFixed(2);

    const accuracy = parseFloat(percent);
    const prediction = labels[index];

    return { prediction, accuracy };
  };

  return { isLoaded, convertToTensor, predict };
};
