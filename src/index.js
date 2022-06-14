const express= require('express'); 
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require ('path');
const flash = require('connect-flash');
const session = require('express-session');
const { options } = require('./routes/');
const  MySQLStore =require('express-mysql-session');
const {dayabase, database} = require('./keys');


// 

// inicializacion---- inicialization 

const app= express();

// configuracion ------settings
app.set('port',process.env.PORT||4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs.engine ({
    defaultLayput: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    parcialDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//MIDDELWARES
app.use( session({
    secret: 'secion',
    resave : false,
    saveUninitialized: false,
    store: new MySQLStore(database)

}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());



//variables glovales 
app.use((req,res,next)=>{
    app.locals.success=req.flash('success');
    next();
})
// rutas -------routes 
app.use(require('./routes/'));
app.use(require('./routes/autentication'));
app.use('/links',require('./routes/links'));
//public 
app.use(express.static(path.join(__dirname,'public')));
// starting the server 
app.listen(app.get('port'),()=>
console.log('server on port ',app.get('port'))

)


