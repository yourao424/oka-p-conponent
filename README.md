# oka-pのlogin,signup機能をコンポーネント化したもの



[TOC]

## 最初に

login.vueとsignup.vueが主な成果物になっています。

全部上げるのでcloneする際に気w歩つけてください

いくつか、ややこしいことをしていると思うのでここに書いていきます。

## 注意事項

1. yarnではなくnpmを使用しての環境です

​	firebase,jquery,location,navigatorをnpmを用いてインストールしています。

​	```npm install --save firebase jquery location navigator```

2. eslintの設定変更

​	npmのeslintを使用していますが、設定を変えています。

```
env: {

	browser: true,

	jquery: true,

},
```

3.main.js app.vue の細かな変更

​	実際に見た方が早いです。