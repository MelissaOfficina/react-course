import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { Configuration } from 'webpack';
import { WebpackDevServerOptions } from 'webpack-cli/lib/types';

import 'webpack-dev-server';

const appCache = path.resolve('.app-cache');
const sourcePath = path.resolve(__dirname, 'src');

const webpackConfig = (
  _: unknown,
  argv: WebpackDevServerOptions,
): Configuration => {
  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: path.resolve(sourcePath, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    ...(process.env.NODE_ENV === 'development'
      ? [new ReactRefreshWebpackPlugin()]
      : []),
  ];

  // Настройка сервера для разработки
  const devServer: Pick<Configuration, 'devtool' | 'devServer'> = {
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      open: false,
      hot: true,
      port: process.env.PORT || 3000,
    },
  };
  return {
    mode: argv?.mode || (process.env.NODE_ENV as Configuration['mode']),
    target:
      argv?.mode === 'production' ||
      (process.env.NODE_ENV as Configuration['mode']) === 'production'
        ? 'browserslist'
        : 'web',
    resolve: {
      alias: {
        app: path.resolve(sourcePath, 'app'),
        pages: path.resolve(sourcePath, 'pages'),
        shared: path.resolve(sourcePath, 'shared'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    // Входная точка проекта
    entry: path.resolve(sourcePath, 'index.tsx'),
    // Точка сборки проекта
    output: {
      // Путь до точки
      path: path.resolve(__dirname, 'build'),
      // Имя файла после сборки
      filename: '[name].[contenthash].js',
      // Файлы картинок, шрифтов и прочих файлов которые не нужно собирать
      assetModuleFilename: 'assets/[hash][ext][query]',
      // Очистка при каждом запуске проекта
      clean: true,
    },
    plugins,
    module: {
      rules: [
        {
          // Загрузчик для HTML
          test: /\.(html)$/,
          use: ['html-loader'],
        },
        {
          // Загрузчик для стилей
          test: /\.(s[ac]|c)ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          // Загрузчик для изображений
          test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
          // В продакшен режиме
          // изображения размером до 8кб будут инлайнится в код
          // В режиме разработки все изображения будут помещаться в dist/assets
          type:
            process.env.NODE_ENV === 'production' ? 'asset' : 'asset/resource',
        },
        {
          // Загрузчик для шрифтов
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          // Загрузчик для JS/JSX/TS/TSX
          test: /\.(js|jsx|ts|tsx)$/,
          // Исключаем директорию node_modules
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              // Использование кэша для избежания рекомпиляции
              // при каждом запуске
              cacheDirectory: path.join(appCache, 'babel'),
            },
          },
        },
      ],
    },
    ...devServer,
  };
};

export default webpackConfig;
