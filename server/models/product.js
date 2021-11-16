import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    productId:{
        type: String,
        required: true
    } ,
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    } ,
    nameProduct:{
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

let Product = mongoose.model('Product', productSchema);

export default Product;