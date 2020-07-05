module.exports = {
  mode: "production",
  target: "web",
  output: {
    libraryTarget: "umd",
    library: "Text",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("postcss-preset-env")({
                  browsers: ["last 2 versions"],
                }),
                require("cssnano")({
                  preset: "default",
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|webp|gif|mp4|mov|ogg|webm)(\?.*)?$/i,
        loader: "file-loader",
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                  targets: {
                    browsers: ["last 2 versions"],
                  },
                },
              ],
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy: true,
                },
              ],
              [
                "@babel/plugin-proposal-class-properties",
                {
                  loose: true,
                },
              ],
              [
                "@babel/plugin-proposal-object-rest-spread",
                {
                  useBuiltIns: true,
                },
              ],
              "babel-plugin-transform-export-extensions",
              "@babel/plugin-transform-react-constant-elements",
            ],
          },
        },
      },
    ],
  },
  externals: {
    react: {
      root: "React",
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
    },
  },
};
