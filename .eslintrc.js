module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off', // 生成器函数*的前后空格
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁止使用debugger
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }], // 函数定义时括号前面要不要有空格
    'one-var': ['error', 'always'], // 连续声明
    'no-unused-expressions': 0, // 禁止无用的表达式
    'prefer-promise-reject-errors': 0 // 禁止promise -> reject 传参为非Error类型的数据报错
  }
}
