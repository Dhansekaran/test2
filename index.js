const express = require('express');
const app = express();
app.locals.title = 'Scooti';
app.get('/',(req,res)=>{
	res.send('index page');
});

const adminapp = require('./admin/adminapp');
app.use('/admin', adminapp);

app.listen(3000,()=>{console.log('app listening port 3000')});