# 說明書

### 本機執行程式

把環境變數設定到機器上

```shell
export LINE_CHANNEL_SECRET="0f65b655xxxxxxabf6c"
export LINE_CHANNEL_TOKEN="KlXdEn5+sFt3aF1pRdxxxxxxyGoRh+8N9xdHCImK03x2n2vxoQ3J9OIthrSqYNF4BqIvNdhW3XkiGwdB04t89/1O/w1cDnyilFU="
export LINE_CHANNEL_ID="1495270559"
export WIT_TOKEN="123456789"
export PRESIDENT_KEY="GTR#673279834@@"
export BOT_NAME="WiWi"
```
> PRESIDENT_KEY 社長金鑰

然後輸入以下指令啟動 server
```
npm install
npm start
```

在本機啟動server 開發的方式

先安裝ngrok，安裝完成並執行上面指令後，接著執行下列指令

```
ngrok http 5000
```

會產生一組外部網路可連結的網址，將此網址填入line develop 中的webhook即可

使用開發模式

```
npm run dev
```

> 啟動後，nodemon 會去監控所有檔案，一旦有變更會自動重啟程式。

### 呼叫機器人
- 群組、聊天室這兩種多人對話方式，需呼叫機器人名字才會執行動作
- 例如：WiWi，我要報名

### 開發
#### 使用資料庫
- 目前使用[mongodb](https://www.mongodb.com/)。
- 使用的連接套件為 mogoose[http://mongoosejs.com/docs/guide.html]。

#### 資料表
```
linebot.users
linebot.activities
linebot.chats
```

#### mongoose + async
- mongoose提供exec()，可回傳promise，搭配await使用。 
```
const user = await this.db.User.findOne({ userId: event.source.userId }).exec();
```

### Heroku 部屬方式
#### 安裝
1. 安裝 heroku command line 並且登入 `heroku login`
2. 到專案資料夾下執行初始命令`heroku apps:create <appname>`

#### 掛載 mongodb
1. `heroku addons:create mongolab:sandbox`

> 雖然是免費的但是仍然會要求輸入信用卡資訊，準備一張沒有錢的visa金融卡填進去就好

#### heroku 把環境變數
到heroku網站把環境變數設定上去如圖
![](http://i.imgur.com/B2uyyod.png)

#### 部屬到Heroku
1. `git push heroku master`
2. 部屬完成之後到專案的網站如果出現 `Hi~!  It's working.` 表示部屬成功了

#### 修改 line bot url
至line business 網址修改 bot api url

----

# 檔案架構

```
.
├── app.json
├── database (目前使用nedb)
│   └── activities.db
│   └── users.db
│   └── chats.db
├── LUIS
│   └── app.json (LUIS 訓練資料)
├── package.json
├── Procfile (設定部屬到heroku以後要執行哪些指令)
├── README.md
└── src
    ├── public (未來網頁放置的地方)
    │   └── index.html
    └── serverIndex.js (server主程式)
    ├── modules (各intent模組程式碼)
    │   └── index.js (統一匯出modules)
    │   └── createActivity.js
    │   └── joinActivity.js
    │   └── listUsers.js
    │   └── registeredPresident.js
    │   └── leaveActivity.js
    │   └── None.js
    └── service
        └── luis.js (串接luis api 功能實做)
        └── linebot.js (擴充連接資料庫功能)
        └── database.js (宣告nedb)
        └── trashtalk.js (垃圾話專區)

```

----

# 維持好的程式碼品質

每次寫完程式以後可以輸入 `npm run lint` 來看哪邊寫的不好
![](http://i.imgur.com/7ZP3eys.png)

**補充說明：目前的npm run dev 有包含 npm run lint 的指令，必須通過lint測試才可以順利啟動server**

# [Wit.ai](https://wit.ai/) intent 以及 entity 解說

### intent 還沒打勾就是我還沒有做好

1. [ ] registeredPresident (註冊社長)
2. [ ] createActivity (社長建立活動)
3. [x] joinActivity (社員加入活動)
4. [x] leaveActivity (社員活動請假)
5. [x] listUsers (列出活動對象)

### entity

1. [x] number(參加人數)

### 範例

> wiwi 有誰要參加活動？
```
 {
     "msg_id": "a3978adc-1246-4236-8d30-10577a6f38ea",
     "_text": "wiwi 有誰要參加活動？",
     "entities": {
         "intent": [{
             "confidence": 0.9040730105760665,
             "value": "listUsers"
         }]
     }
 }
```
