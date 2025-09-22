export default {
  gifsicle: { optimizationLevel: 3, interlaced: true, colors: 256 },
  mozjpeg: { quality: 75, progressive: true },
  optipng: { optimizationLevel: 5 },
  svgo: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            addAttributesToSVGElement: {
              params: {
                attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }]
              }
            }
          }
        }
      }
    ]
  }
};