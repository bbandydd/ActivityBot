# 說明書

### 本機執行程式

把環境變數設定到機器上

```shell
export LINE_CHANNEL_SECRET="0f65b655xxxxxxabf6c"
export LINE_CHANNEL_TOKEN="KlXdEn5+sFt3aF1pRdxxxxxxyGoRh+8N9xdHCImK03x2n2vxoQ3J9OIthrSqYNF4BqIvNdhW3XkiGwdB04t89/1O/w1cDnyilFU="
export LINE_CHANNEL_ID="1495270559"
export MONGODB_URI="mongodb://localhost/linebot"
```

然後輸入以下指令啟動 server
```
npm install
npm start
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
├── app.json
├── package.json
├── Procfile (設定部屬到heroku以後要執行哪些指令)
├── README.md
└── src
    ├── public (未來網頁放置的地方)
    │   └── index.html
    └── serverIndex.js (server主程式)
```
