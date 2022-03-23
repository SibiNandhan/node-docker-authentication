const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');

const cors=require('cors');

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');

const session=require('express-session');
const redis=require('redis')
let RedisStore=require('connect-redis')(session)
let redisClient=redis.createClient({
    host:REDIS_URL,
    port:REDIS_PORT
})



const postRoute=require('./routes/postRoute');
const userRoute=require('./routes/userRoute')

dotenv.config({path:'./config.env'})
const app=express();
app.use(cors())
const mongoURL=`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`




const retryIfNotConnect=()=>{
    mongoose.connect(mongoURL).then(()=>{
        console.log('Successfully connected')
    }).catch(err=>{
        console.log(err)
        setTimeout(retryIfNotConnect,5000);
    });
}
retryIfNotConnect();


app.use(express.json());

app.enable("trust proxy")
app.use(session({
    store:new RedisStore({client:redisClient}),
    secret:SESSION_SECRET,
    cookie:{
        secure:false,
        resave:false,
        saveUninitialized:false,
        httpOnly:true,
        maxAge:300000
    }
}))

app.use('/api/posts',postRoute);
app.use('/api/users',userRoute);

app.get('/api',(req,res)=>{
    res.send("Hello World!!!!!!!")
    
})

app.listen(process.env.PORT,()=>{
    console.log(`Listening to port 4000`)
})


