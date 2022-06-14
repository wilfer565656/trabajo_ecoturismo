const express= require('express'); 
const router=express.Router();
const  pool= require('../database');


router.get('/add',(req,res)=>{
    res.render('links/add')
})

router.post('/add',async (req,res)=>{
    
    const {title,url,descripcion} = req.body;
    const newLink={
        title,
        url,
        descripcion
    };
    
    await pool.query('INSERT INTO links set ?',[newLink])
    req.flash('success','link guardado')
    
    res.redirect('/links')

})

router.get('/',async (req,res)=>{
    const links = await pool.query( 'SELECT * FROM links');
    res.render('links/list',{links:links });
});

router.get('/delete/:id',async (req,res)=>{
    const {id} = req.params;
    await  pool.query('DELETE FROM links WHERE Id = ?',[id]);
    req.flash('success','link eliminado')
    res.redirect('/links') 
});
router.get('/edit/:id',async (req,res)=>{
    const {id} = req.params;
    
    const links = await  pool.query('SELECT * FROM links WHERE Id = ?',[id]);
    console.log(links[0]);
    
    
    res.render('links/edit',{links:links [0]});
});

router.post('/edit/:id',async (req,res)=>{
    const {id} = req.params;
    const {title,url,descripcion} = req.body;
    const newLink={
        title,
        url,
        descripcion
    };
    await pool.query('UPDATE links set ? WHERE  id = ?',[newLink,id])
    req.flash('success','actualizado')
    res.redirect('/links');

})

module.exports= router;
