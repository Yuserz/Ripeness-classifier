const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const {
    resolver: { assetExts },
  } = await getDefaultConfig(__dirname);

  return {
    resolver: {
      assetExts: [...assetExts, "bin", "json"], // Add "bin" extension to the assetExts array
    },
  };
})();
