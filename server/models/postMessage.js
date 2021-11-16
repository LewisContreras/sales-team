import mongoose from 'mongoose';

const saleSchema = mongoose.Schema({
    totalPrice:{
        type: Number,
        required: true
    } ,

    price: {
        type: Number,
        required: true
    } ,
    product: {
        type: String,
        required: true
    },
    saleId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    } ,
    name:String,
    seller: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    docClient: {
        type: String,
        required: true
    },
    selectedFile: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('Sale', saleSchema);

export default PostMessage;