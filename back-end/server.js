const express = require('express');
const app = express();

require('dotenv').config();

const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());

const { ObjectId } = require('mongodb');

// body-parser 미들웨어를 사용하여 허용되는 페이로드 크기 설정
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.qme18ml.mongodb.net/?retryWrites=true&w=majority',
    function (error, client) {
        if (error) return console.log(error)
        db = client.db('3355cafe');
        // 최초 db 연결 확인 콘솔
        console.log('--------@@@--------')
        console.log('success to connecting DB');

        // mongodb connect 시 서버 연결 원할 경우
        app.listen(8080, function () {
            console.log('listening on 8080')
        })
    })

// signUp page, id check
app.get('/checkId/:imsiId', async function (req, res) {
    try {
        console.log('Received a checkId request from the front end.');
        db.collection('users').findOne({ userId: req.params.imsiId }, function (error, result) {
            console.log(result)
            res.send({ result: result })
        })
    }
    catch (error) {
        console.error('Error processing signUp request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
// signUp page, register user info
app.post('/signUp', async function (req, res) {
    try {
        console.log('Received a signUp request from the front end.');
        // 여기에서 실제로 데이터베이스에 데이터를 추가하는 등의 작업 수행 가능
        db.collection('users').insertOne({
            userId: req.body.userId,
            userPassword: req.body.userPassword,
            userName: req.body.userName,
            birth: req.body.birth,
            phoneNumber: req.body.phoneNumber,
            profileImgURL: req.body.profileImgURL,
            profileImgName: req.body.prifileImgName,
            gender: req.body.gender,
            role: req.body.role,
            isVanned: req.body.isVanned,
            boardLikeList: req.body.boardLikeList,
            replyLikeList: req.body.replyLikeList,
        }, function (error, result) {
            if (error) {
                console.error('Error inserting data into the database:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
            else {
                console.log('Data inserted successfully.');
                res.status(200).json({ message: 'Success' });
            }
        })
    } catch (error) {
        console.error('Error processing signUp request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// login page, user login
app.get('/login', async function (req, res) {
    try {
        console.log('Login processing start');
        console.log('userId : ' + req.query.userId);
        console.log('userPassword : ' + req.query.userPassword);
        db.collection('users').findOne({ userId: req.query.userId, userPassword: req.query.userPassword }, function (error, result) {
            console.log(result)
            res.send({ result: result })
        })
    }
    catch (error) {
        console.error('Error processing signUp request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// board page, get board category list
app.get('/boardType', async function (req, res) {
    try {
        console.log('boardType processing start');

        const result = await db.collection('boardType').find({}).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting boardType data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// register board
app.post('/register/board', async function (req, res) {
    try {
        console.log('Received a regiBoard request to save data from the front end.');
        const { boardType,
            boardTitle,
            contentRaw,
            contentHTML,
            images,
            userId,
            userPrimeId,
            userName,
            views,
            date,
            likeList,
            unLikeList, } = req.body;

        // content: JSON.stringify(contentRaw),
        // 데이터베이스에 데이터 추가
        await db.collection('board').insertOne({
            boardType,
            boardTitle,
            contentRaw,
            contentHTML,
            images,
            userId,
            userPrimeId,
            userName,
            views,
            date,
            likeList,
            unLikeList,
        });

        // 클라이언트에 성공 응답 전송
        res.status(200).json({ message: 'Wysiwyg Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// board list get
app.get('/boardList', async function (req, res) {
    try {
        console.log('getWysiwyg processing start');

        const result = await db.collection('board').find({}).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting getWysiwyg data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// --------------------------- test area
// wysiwyg post
app.post('/test/wysiwyg', async function (req, res) {
    try {
        console.log('Received a Wysiwyg request to save data from the front end.');
        const { id, title, contentRaw, contentHTML, images } = req.body;

        // 데이터베이스에 데이터 추가
        await db.collection('test').insertOne({
            id,
            title,
            contentRaw,
            contentHTML,
            images,
        });

        // 클라이언트에 성공 응답 전송
        res.status(200).json({ message: 'Wysiwyg Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// wysiwyg get list
app.get('/test/getWysiwyg', async function (req, res) {
    try {
        console.log('getWysiwyg processing start');

        const result = await db.collection('test').find({}).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting getWysiwyg data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});