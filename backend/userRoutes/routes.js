const express = require('express');
const {getProducts, addProducts, updateProducts, deleteProduct, getSellerProducts,upload}=require("../controllers/productControllers")
const {checkUser}=require("../middleware/authMiddleware"); 

const router=express.Router();

router.get("/get-products",getProducts);
router.get("/get-seller-products/:id",checkUser,getSellerProducts);

router.post("/add-products",checkUser,upload.single('image'),addProducts);

router.put("/update-products/:id",checkUser,updateProducts);

router.delete("/delete-product/:id",checkUser,deleteProduct);





module.exports=router;