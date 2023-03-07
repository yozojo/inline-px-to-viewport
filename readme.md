# linline-px-to-viewport
一个让vite专门处理react中关于内联style中px转vw的插件


### install

```npm
npm install inline-px-to-viewport --save-dev
```

### Use

vite

```javascript
import InlinePx2Vw from 'inline-px-to-viewport';

export default function() {
  return {
    plugins: [
      InlinePx2Vw(), // 放在第一个
      react(),
    ],
  };
}

```

### option
默认配置
```javascript
defaultsProp = {
  viewportWidth: 750,
  unitPrecision: 5,
  viewportUnit: 'vw',
  minPixelValue: 1
}
```
