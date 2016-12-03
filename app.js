var express = require('express');
var app = express();
var mysql = require('mysql');
//创建mysql连接
var client = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'api52',
});

client.connect();
//设置模板引擎
app.set('view engine', 'ejs');
// 主页输出"hello node"
app.get('/', function(req, res) {
    console.log("主页GET请求");
    res.send('hello node GET');
})

//post请求

app.post('/', function(req, res) {
        console.log("主页 post 请求");
        res.send('hello node post');
    })
    //加载表单页面
app.get('/index.htm', function(req, res) {
    // res.sendFile(__dirname + "/" + "index.htm");
    res.render('index');
})

//表单处理页面
app.get('/guestbook', function(req, res) {
        let nickname = req.query.nickname;
        let message = req.query.message;
        var gbook = { nickname: nickname, message: message };
        var query = client.query(
            // "insert into gbook values('','" + nickname + "','" + message + "')",
            "insert into gbook set ?", gbook,
            function(err, results) {
                if (err) {
                    return res.send('留言没成功,滚犊子');
                } else {
                    // return results;
                    let responseText = results.protocol41;
                    // return responseText;
                    console.log(results);
                    if (responseText === true) {
                        return res.send('感谢您的留言');
                    } else {
                        return res.send('留言没成功,滚犊子');
                    }
                }

            }
        );
        console.log(query.sql);
    })
    //留言展示页面
app.get('/gblist', function(req, res) {
    client.query("select * from gbook", function(err, results) {
        // let value = '';
        // for (var key in results) {
        //     value += '<table border="1">';
        //     // value += '<tr><td>'+JSON.stringify(results[key])+'</td></tr>';
        //     value += '<tr><td>' + results[key].nickname + '</td><td>' + results[key].message + '</td></tr>';
        //     value += '</table>';
        // }
        // res.send(value);
        res.render('gblist',{'title':'留言列表','mglist':results});
    });
})
var server = app.listen(80, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实列, 访问地址为 http://%s.%s", host, port);
})
