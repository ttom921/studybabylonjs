# studybabylonjs

這是學習babylogjs的

## 00_babylonjs-ts-template

建立基本的專案結構(參考)[https://reddotblues.medium.com/babylon-js-typescript-project-setup-for-the-impatient-d8c71b4a57ad]

```
npm init
npm install --save-dev typescript webpack ts-loader webpack-cli
npm install babylonjs --save
```

建立檔案`webpack.config.js`

```javascript
const path = require('path')

module.exports = {
    mode: "development",
    entry: {
        app: "./src/app.ts"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', 'tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [],
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}
```

建立`tsconfig.json`

```json
{
    "compileOnSave": true,
    "compilerOptions": {
        "target": "ES2015",
        "module": "ES2015",
        "sourceMap": true,
        "outDir": "./dist",
        "types": [
            "babylonjs"
        ]
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.js"
    ]
}
```
修改`package.json`
```json
"scripts": {
    "build": "webpack",
    "watch": "webpack -w",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```
建立`index.html`
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Six</title>
    <style>
        html,body {overflow: hidden;width: 100%;height: 100%;margin: 0;padding: 0;}
        #renderCanvas {width: 100%;height: 100%;touch-action: none;}
    </style>
</head>
<body>
    <canvas id="renderCanvas" touch-action="none"></canvas>
    <script src="dist/app.js"></script>
</body>
</html>
```
建立`src`資料夾和`app.ts`

tobuild
```
npm run build
```
自動
```
npm run watch
```