// 配置文件
var path = require("path");
module.exports = {
    entry: './src/main.js',     // 入口
    output: {       // 输出
         path: path.resolve(__dirname, './dist'),
         filename: 'bundle.js'
    }
};