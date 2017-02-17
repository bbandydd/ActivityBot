# 說明書

### 本機執行程式

把環境變數設定到機器上

```shell
export LINE_CHANNEL_SECRET="0f65b655xxxxxxabf6c"
export LINE_CHANNEL_TOKEN="KlXdEn5+sFt3aF1pRdxxxxxxyGoRh+8N9xdHCImK03x2n2vxoQ3J9OIthrSqYNF4BqIvNdhW3XkiGwdB04t89/1O/w1cDnyilFU="
export LINE_CHANNEL_ID="1495270559"
export MONGODB_URI="mongodb://localhost/linebot"
export LUIS_API_URL="https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/fba8ab1a-6a5c-4d01-9746-b7ede1712730?subscription-key=5f997f5dca334e9ebf60ec23bf6b4d87"
```

然後輸入以下指令啟動 server
```
npm install
npm start
```

在本機啟動server 開發的方式

先安裝ngrok（安裝方法待捕上），安裝完成並執行上面指令後，接著執行下列指令

```
ngrok http 5000

```

會產生一組外部網路可連結的網址，將此網址填入line develop 中的webhook即可

使用開發模式

```
npm run dev
```

> 啟動後，nodemon 會去監控所有檔案，一旦有變更會自動重啟程式。

### 開發
#### 使用資料庫
- 目前使用[nedb](https://github.com/louischatriot/nedb)
#### 資料表
```
db.users
db.activities
```
#### db擴充方法，使用方式如下章節
```
db.insert
db.find
db.findOne
db.count
db.update
db.remove
```
#### db使用方式，以src/modules/createActivity.js為例
```
[this.db]： 包含資料表及db擴充方法
使用async、await取得response
const response = await this.db.[方法]([資料表], [寫入值]);
```
```
async function createActivity(event, result) {
    const entity = {
      location: luisResult.entityObject.location,
      startTime: luisResult.entityObject['activityTime::activityStartTime'],
      endTime: luisResult.entityObject['activityTime::activityEndTime'],
      date: luisResult.entityObject['builtin.datetime.date'],
      user: event.message.id,
    };
    const response = await this.db.insert(this.db.activities, entity);
    event.reply(response.error ? '活動建立失敗！' : '活動建立成功！');
}
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

```

----

# 維持好的程式碼品質

每次寫完程式以後可以輸入 `npm run lint` 來看哪邊寫的不好
![](http://i.imgur.com/7ZP3eys.png)

# LUIS intent 以及 entity 解說

### intent

1. registeredPresident (註冊社長)
2. createActivity (社長建立活動)
3. joinActivity (社員加入活動)
4. leaveActivity (社員活動請假)
5. listUsers (列出活動對象)

### entity

1. location (活動進行的地點)
2. activityTime(活動進行的時間)
 - activityStartTime (活動開始時間)
 - activityEndTime (活動結束時間)

### 範例

```
星期三建立活動時間18:00~20:00地點大魯格草衙道

intent: createActivity
entity:
    location: 大魯格草衙道
    activityStartTime: 18:00
    activityEndTime: 20:00
```
