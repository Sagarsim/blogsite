const mongoose = require('mongoose');
const articleModel = mongoose.model('Articles');
const router = require('express').Router();

router.post('/', (req, res, next) => {
    const {body} = req;
    
    if(!body.title){
        return res.status(422).json({
            errors: {
                title: 'is required'
            }
        })
    }

    if(!body.author){
        return res.status(422).json({
            errors: {
                title: 'is required'
            }
        })
    }

    if(!body.body){
        return res.status(422).json({
            errors: {
                title: 'is required'
            }
        })
    }

    const finalArticle = new articleModel(body);
    return finalArticle.save()
                .then(() => res.json({articles: finalArticle.toJSON()}))
                .catch(next);   
})

router.get('/', (req, res, next) => {
    return articleModel.find()
                .sort({ createdAt: 'descending' })
                .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
                .catch(next);
})

router.param('id', (req, res, next, id) => {
    articleModel.findById(id, (err, article) => {
        if(err){
            return res.sendStatus(404);
        } else if(article){
            req.article = article;
            return next();
        }
    }).catch(next);
})

router.get('/:id', (req, res, next) => {
    return res.json({
        article: req.article.toJSON()
    });
});

router.patch('/:id', (req, res, next)=> {
    const {body} = req;

    if(typeof req.article.title !== 'undefined'){
        req.article.title = body.title;
    }

    if(typeof req.article.author !== 'undefined'){
        req.article.author = body.author;
    }

    if(typeof req.article.body !== 'undefined'){
        req.article.body = body.body;
    }

    return req.article.save()
                      .then(() => res.json({article: req.article.toJSON() }))
                      .catch(next);
})

router.delete('/:id', (req, res, next) => {
    return articleModel.findByIdAndRemove(req.article._id)
                       .then(() => res.sendStatus(200))
                       .catch(next); 
})

module.exports = router;