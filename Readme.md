# ExceptFront
このリポジトリは Code Chrysalis の生徒であるときに作成しました（This was created during my time as a student at Code Chrysalis）

## Exceptとは
**今日を失敗したくない、あなたのために。**

他人からオススメされたレストランに、自分が根本的に「合わない」要素が含まれていた
経験はありますか？
「他人のオススメは必ずしも自分の好みにはなり得ない」からこそ
レコメンド機能を充実させるのではなく、嫌いな要素を除外する機能を追加した
「嫌いなものを除外してから表示するレストラン検索機能」です。

## リポジトリの説明
Exceptのフロントエンド向けのリポジトリです。
※バックエンドのリポジトリは以下に作成されています。
(https://github.com/Minesweeper-from-Code-Chrysalis/ExceptBack)

## コマンドの説明

このプロジェクトは以下のようにブートストラップされています。
 [Create React App](https://github.com/facebook/create-react-app).

## `yarn install`

開発環境にクローン後、yarnをインストールしてください。

## `yarn start`

ターミナルでコマンド実行後、\
ブラウザ上で [http://localhost:3000](http://localhost:3000) が開かれます。

開発環境でファイルを修正後、変更内容がブラウザにも反映されます。

## コンポーネントの概要
### 検索（Search.js）
除外ワード、検索したいエリア、フリーワードを入力してレストランを検索することができます。
検索ボタンを押下後、検索結果の一覧を表示する画面（AllShops.js）に遷移します。
検索条件に合致するレストランが存在しない場合は、エラー画面（Error.js）に遷移します。

![画面イメージ](screenshots/Search.png)

### レストラン一覧（AllShops.js）
検索画面で指定した検索条件に合致したレストランの一覧を表示します。
任意のレストラン押下後、レストラン詳細画面（SingleShop.js）に遷移します。

![画面イメージ](screenshots/AllShops.png)

### レストラン詳細（SingleShop.js）
レストラン一覧画面で選択されたレストランの詳細情報を表示する画面です。
画面上部ヘッダー部分の「一覧に戻る」を押下することで、レストラン一覧画面（AllShops.js）に遷移します。

![画面イメージ](screenshots/SingleShop.png)

### エラー（Error.js）
検索画面で検索した結果、指定した検索条件に合致したレストランが存在しなかった場合に、本画面に遷移します。
「トップページに戻る」を押下後、検索画面（Search.js）に遷移します。

![画面イメージ](screenshots/Error.png)

## デプロイの説明
reactで開発したフロントエンドアプリは[AWS Amplify](https://aws.amazon.com/jp/amplify/)を利用してデプロイします。\
デプロイのタイミングはmain branchにmergeされた時で、mergeをトリガーに自動でデプロイが実行されます。\
デプロイの状況はAWSのコンソール( **AWS Amplify** > **すべてのアプリ** > **ExceptFront** )から見ることができます。\
実際にデプロイされたコンテンツは下記のURLから利用することができます。\
(https://main.d1kfboacuw8kal.amplifyapp.com/?#home )

## 使用言語
- react -v 17.0.1
- eslint -v 7.14.0
- prettier -v 3.1.4
- JavaScript -v ES6
- css -v 3

## 参考情報
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).　\
Reactについては以下を参照してください。\
 [React documentation](https://reactjs.org/).

### Code Splitting
 [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size
[https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App
 [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration
[https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment
[https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify
 [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
