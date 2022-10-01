
const dotenv = require('dotenv');//加载配置
dotenv.config();
const Koa = require("koa");

const app_config = require("./config/app");
const middleware = require('./middleware');
const router = require('./router/index');

const app = new Koa();

middleware.Load(app);//加载中间件

router.Load(app);//加载控制器

app.listen(app_config.port);