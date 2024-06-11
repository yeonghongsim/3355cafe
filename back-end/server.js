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
// get user's board list
app.get('/myBoardList/:userId', async function (req, res) {
    console.log('myBoardList processing start');
    const userId = req.params.userId;
    console.log(userId);

    try {
        console.log('myBoardList processing start');

        const result = await db.collection('board').find({
            userPrimeId: userId
        }).toArray();
        res.status(200).json(result);
        console.log(result);
    } catch (error) {
        console.error('Error getting boardType data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// register board
app.post('/register/board', async function (req, res) {
    try {
        console.log('Received a regiBoard request to save data from the front end.');
        const {
            boardId,
            boardTypeValue,
            boardTypeName,
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
        console.log(req.body);
        // content: JSON.stringify(contentRaw),
        // 데이터베이스에 데이터 추가
        await db.collection('board').insertOne({
            boardId,
            boardTypeValue,
            boardTypeName,
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
        console.log('get boardList start');

        const result = await db.collection('board').find({}).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting boardList data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// board list get
app.get('/boardList/:moreURL', async function (req, res) {
    try {
        console.log('get boardList start');
        const moreURL = req.params.moreURL;
        console.log(moreURL);

        const result = await db.collection('board').find(
            { boardTypeValue: moreURL }
        ).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting boardList data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// board list get by searchData
app.get('/boardList/search/:searchData', async function (req, res) {
    try {
        console.log('get boardList start');
        const searchData = req.params.searchData;
        console.log(`<p>${searchData}</p>`);

        const result = await db.collection('board').find({}).toArray();
        // const result = await db.collection('board').find({
        //     contentHTML: `<p>${searchData}</p>`
        // }).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting boardList data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// get board detail
app.get('/boardDetail/:boardId', async function (req, res) {
    try {
        console.log('get board detail start');
        const boardId = req.params.boardId;

        const result = await db.collection('board').findOne({
            _id: new ObjectId(boardId)
        });
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting boardList data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// board update countViews
app.post('/update/board/addUseridInViews', async function (req, res) {
    console.log('start update board');
    try {
        console.log(req.body);
        const boardId = req.body.boardId;
        const data = {
            views: req.body.views
        }
        const result = await db.collection('board').updateOne(
            { boardId: boardId },
            { $set: data }
        )
        console.log('Matched ' + result.matchedCount + ' document(s) and modified ' + result.modifiedCount + ' document(s)');
        // return board object
        // 게시글 정보 재전달
        console.log('start to return updated board to front-end.');
        const board = await db.collection('board').findOne(
            { boardId: boardId }
        )
        res.status(200).json({ message: 'Success', board });
    }
    catch (error) {
        console.error('Error processing updateBoard request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// board likelist put userId
app.post('/update/board/toggleLikeList', async function (req, res) {
    console.log('start update board');
    try {
        const boardId = req.body.boardId;
        const data = {
            likeList: req.body.likeList
        }
        const result = await db.collection('board').updateOne(
            { boardId: boardId },
            { $set: data }
        )
        console.log('Matched ' + result.matchedCount + ' document(s) and modified ' + result.modifiedCount + ' document(s)');
        res.status(200).json({ message: 'Success' });
    }
    catch (error) {
        console.error('Error processing updateBoard request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// board unlikelist put userId
app.post('/update/board/toggleUnlikeList', async function (req, res) {
    console.log('start update board');
    try {
        const boardId = req.body.boardId;
        const data = {
            unLikeList: req.body.unLikeList
        }
        const result = await db.collection('board').updateOne(
            { boardId: boardId },
            { $set: data }
        )
        console.log('Matched ' + result.matchedCount + ' document(s) and modified ' + result.modifiedCount + ' document(s)');
        res.status(200).json({ message: 'Success' });
    }
    catch (error) {
        console.error('Error processing updateBoard request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// /update/user/${userId}/logInfo
app.post('/update/user/:userId/logInfo', async function (req, res) {
    console.log('start update user loginfo');
    try {
        const userId = req.params.userId;
        const data = req.body;
        // console.log(userId);
        // console.log(data);
        await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: data }
        )
        res.status(200).json({ message: 'Success' });
    }
    catch (error) {
        console.error('Error processing updateBoard request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// /update/user/${userId}/userInfo
app.post('/update/user/:userId/userInfo', async function (req, res) {
    console.log('start update user userInfo');
    try {
        const userId = req.params.userId;
        const data = req.body;
        // console.log(userId);
        // console.log(data);
        await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            { $set: data }
        )
        console.log('start to return updated userInfo to front-end.');
        const userInfo = await db.collection('users').findOne(
            { _id: new ObjectId(userId) }
        )
        res.status(200).json({ message: 'Success', userInfo });
    }
    catch (error) {
        console.error('Error processing updateBoard request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// --- test6 관련
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