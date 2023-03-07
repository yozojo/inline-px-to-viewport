// 默认参数
const defaultsProp = {
  viewportWidth: 750,
  unitPrecision: 5,
  viewportUnit: 'vw',
  minPixelValue: 1,
};

function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

function createPxReplace(
  viewportSize,
  minPixelValue,
  unitPrecision,
  viewportUnit,
) {
  return function($0, $1) {
    if (!$1) return;
    const pixels = parseFloat($1);
    if (pixels <= minPixelValue) return;
    return toFixed((pixels / viewportSize) * 100, unitPrecision) + viewportUnit;
  };
}

const pxGlobalReg = /(\d+)px/gi;
const fileGlobalReg = /\.jsx?$|\.tsx?$/;


module.exports = function pluginGenerator(customOptions = defaultsProp) {
  return {
    name: 'inline-px-to-viewport',
    transform(code, id) {
      if (fileGlobalReg.test(id)) {
        if (pxGlobalReg.test(code)) {
          const $_source = code.replace(
            pxGlobalReg,
            createPxReplace(
              customOptions.viewportWidth,
              customOptions.minPixelValue,
              customOptions.unitPrecision,
              customOptions.viewportUnit,
            ),
          );
          code = code.replace(code, $_source);
        }
      }
      return { code };
    },
  };
};
