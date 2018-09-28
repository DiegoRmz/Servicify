const express = require('express');
const mySQL   = require('mysql');
const methodOverride = require('method-override');
const http = require('http');
const bodyParser = require('body-parser');

const AdController = require('./controller/AdController');
const PaymentMethodController = require('./controller/PaymentMethodController');
const ReviewController = require('./controller/ReviewController');
const UserController = require('./controller/UserController');

const app = express();

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.router();

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



router.route('/user/create').post(userController.createUser);
router.route('/user/get').post(userController.getUser);
router.route('/ad/create').post(adController.createAd);
router.route('/ad/get').get(adController.getAds);
router.route('/ad/review/create').post(reviewController.createReview);
router.route('/ad/review/:emailadId').get(reviewController.getReviewsForAd);
router.route('/user/payment/create').post(paymentMethodController.createPaymentMethod);
router.route('/user/payment/get/:usermail').post(paymentMethodController.getPaymentMethodsForUser);

app.use(router);

//Listen @ port 3000
app.listen(3000,()=>{
    console.log('listening at port 3000');
})