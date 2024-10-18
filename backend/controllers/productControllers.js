const product = require("../models/productModel");
const multer = require('multer');
const path = require('path');

// const seller=require('../models/sellerModel');



const getProducts = async (req, res) => {
    try {
        const data = await product.find({});
        res.status(200).send({
            success: true,
            message: "Data of Products",
            data
        });


    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        })

    }
}

const getSellerProducts = async (req, res) => {
    try {
        const id = req.params.id;

        const sellerProducts = await product.find({ seller: id });
        // console.log(sellerProducts)
        res.status(200).send({
            success: true,
            message: "seller products",
            sellerProducts
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        })
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

const algoliasearch = require('algoliasearch').default;

const client = algoliasearch('VQ3KJTIQVD', '1ef54c07db897a42aa603e7acb1861ad');
const index = client.initIndex('products');  

const addProducts = async (req, res) => {
    try {
        const { name, description, price, discount, category, seller } = req.body;
        const image = req.file.path;

        const productData = {
            name, description, price, discount, category, image, seller
        }
        const newProduct = await new product(productData).save();
         
        // console.log(client);
        

        await index.saveObject({
            objectID: newProduct._id.toString(),  // Algolia requires objectID for each object
            name, 
            description, 
            price, 
            discount, 
            category, 
            image, 
            seller
        });

        res.status(200).send({
            success: true,
            message: "product saved succesfully",
            productData
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            err
        })

    }
}


const updateProducts = async (req, res) => {
    try {
        const productId = req.params.id;
        const dataa = req.body;
        await product.updateOne({ _id: productId }, { $set: req.body });
        res.status(200).send({
            success: true,
            message: "product saved succesfully",
            dataa
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal error",
            error: error
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const Id = req.params.id;
        await product.findOneAndDelete({ _id: Id });
        res.status(200).send({
            success: true,
            message: "product delete succesfully",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal error",
            error
        })
    }
}




module.exports = { getProducts, addProducts, updateProducts, deleteProduct, getSellerProducts, upload };