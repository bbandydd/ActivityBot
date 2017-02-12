# LINE BOT

### 環境設定
我把一些db設定跟 line bot 參數抽取到了環境變數，這樣方便大家deploy到各種平台上面，首先在執行之前要先設定環境變數如下

```shell
export LINE_CHANNEL_SECRET=0f65b655xxxxxxabf6c
export LINE_CHANNEL_TOKEN=KlXdEn5+sFt3aF1pRdxxxxxxyGoRh+8N9xdHCImK03x2n2vxoQ3J9OIthrSqYNF4BqIvNdhW3XkiGwdB04t89/1O/w1cDnyilFU=
export LINE_CHANNEL_ID=1495270559
export MONGODB_URI=mongodb://heroku_v9xxxx51t9gj:j9g1l1xxxxxp84lj4oi69gpos5r35pq@ds13xxxx9899.mlab.com:39899/heroku_v951t9gj
```

### 本機執行程式
如果要在本機執行建議安裝 mongodb
把環境變數設定到機器上然後輸入以下指令
```
npm install
npm start
```

### Heroku

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
