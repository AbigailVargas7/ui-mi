const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(pdf)(\?.*)?$/, // Esto coincide con archivos .pdf
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/pdf/[name].[hash:8].[ext]', // Especifica la carpeta y nombre del archivo
              },
            },
          ],
        },
      ],
    },
  },
});
