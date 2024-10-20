import path from 'path';
import { fileURLToPath } from 'url';

import pkg from 'node-polyfill-webpack-plugin';
const { NodePolyfillPlugin } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // Set the `targets` option to 'node' 
                  // and use `useBuiltIns: 'usage'` as before
                  targets: {
                    node: 'current'
                  },
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.html$/,  // Apply this rule to .html files
        use: [
          {
            loader: 'html-loader',  // Use html-loader for HTML files
          },
        ],
      },
    ],
  },
  resolve: {
    fallback: {
      "tls": false,  // Don't polyfill 'tls'
      "net": false,  // Don't polyfill 'net'
      "url": false,  // Polyfill 'url'
      "path": false,
      "fs": false,
      "crypto": false,
      "stream-browserify": false,
      "os": false,
      "stream": false,
      "dns": false,
      "child_process": false,
      "zlib": false,
      "http": false,
      "https": false,
      "querystring": false,
      "nock": false,
      "aws-sdk": false,
      "mock-aws-s3": false
    },
  },
  plugins: [
    NodePolyfillPlugin,  // Include polyfills for Node.js core modules
  ],
  mode: 'production',
};