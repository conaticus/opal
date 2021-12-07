const path = require("path");

module.exports = {
  mode: "development",

  // All pages with a source file must be added here
  entry: {
    editor: "./src/app/pages/editor/index.ts",
    menu: "./src/app/pages/menu/index.ts",
    "new-project": "./src/app/pages/new-project/index.ts",
  },
  
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './src/app/build'),
  },
};