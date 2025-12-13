const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').congig();

const app = express();

app.use(cors());
app.use(express.json());
const postSchema = new mongoose.Schema({
    title: { type: String,required: true },
    content: { type:String, required: true},
    author: { type: String, default:'Anonymous'}
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

app.post('/api/posts', async (req, res) =>{
    try{
        const { title, content, author} = req.body;
        if(title || content){
            return res.status(400).json({
                success: false,
                message: 'Title and contet are required'
            });
        }
        const post = new post({
            title,
            content,
            suthor: author || 'Anonymous'
        });
        
    }
})
