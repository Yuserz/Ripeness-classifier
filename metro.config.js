const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const {
    resolver: { assetExts },
  } = getDefaultConfig(__dirname);

  return {
    resolver: {
      assetExts: [...assetExts, "bin", "json"], // Add "bin" extension to the assetExts array
    },
    transformer: {
      assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    },
  };
})();
