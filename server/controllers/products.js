import express from 'express';
import mongoose from 'mongoose';

import Product from '../models/product.js';

const router = express.Router();

export const getProducts = async (req, res) => { 
    try {
        const postMessages = await Product.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Product.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    const post = req.body;

    const newPostMessage = new Product({ ...post, seller: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const findProduct = async (req, res) => {
    const { productId, description } = req.body;
  
    try {
      let searched;
      if( productId !== ""){
        searched = await Product.find({ productId });
      } else if (description !== "") {
        searched = await Product.find({ description });
      } else {
        searched = await Product.find({});
      }
      res.status(200).json({ searched});
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { ...post, _id: id };

    await Product.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Product.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export default router;