const express = require('express');
const mySQL   = require('mysql');
const methodOverride = require('method-override');
const http = require('http');
const bodyParser = require('body-parser');

console.log("here");
const AdController = require('./controller/AdController');
const PaymentMethodController = require('./controller/PaymentMethodController');
const ReviewController = require('./controller/ReviewController');
const UserController = require('./controller/UserController');

const app = express();

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();

const connectionPool = mySQL.createPool({
    connectionLimit: 1000,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rockDB64',
    database: 'servicify',
    debug: 'true'
});

const adController = new AdController(connectionPool);
const paymentMethodController = new PaymentMethodController(connectionPool);
const reviewController = new ReviewController(connectionPool);
const userController = new UserController(connectionPool);



router.route('/user/create').post(function(request,result,next){
    userController.createUser(request,result);
});
router.route('/user/get').post(function(request,result,next){
    userController.getUser(request,result);
});

router.route('/ad/create').post(function(request,result,nxt){
    adController.createAd(request,result);
});
router.route('/ad/get').get(function(request,result,next){
    adController.getAds(request,result);
});

router.route('/ad/review/create').post(function(request,result,nxt){
    reviewController.createReview(request,result);
});
router.route('/ad/review/:emailadId').get(function(request,result,nxt){
    reviewController.getReviewsForAd(request,result);
});

router.route('/user/payment/create').post(function(request,result,nxt){
    paymentMethodController.createPaymentMethod(request,result);
});
router.route('/user/payment/get/:usermail').post(function(request,result,nxt){
    paymentMethodController.getPaymentMethodsForUser(request,result);
});

app.use(router);

//Listen @ port 3000
app.listen(3000,()=>{
    console.log('listening at port 3000');
})