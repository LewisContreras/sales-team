import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'

import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, name, googleId } = req.body.result;

  try {
    let oldUser = await UserModal.findOne({ email });

    if (!oldUser) {
      oldUser = await UserModal.create({ email, name, googleId});
    } 
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUsers = async (req, res) => { 
  try {
      const postMessages = await UserModal.find();    
      res.status(200).json(postMessages);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const createUser = async (req, res) => {
  const post = req.body;

  const newPostMessage = new UserModal({ ...post, seller: req.userId, createdAt: new Date().toISOString() })

  try {
      await newPostMessage.save();

      res.status(201).json(newPostMessage );
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { ...post, _id: id };

  await UserModal.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await UserModal.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}