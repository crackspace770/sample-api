const Product = require('../models/product.model.js');


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getProductId = async (req, res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.status(200).json(product);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const createProduct = async(req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    
    }catch(error){
        console.log(error);
        res.status(500).send(error);}
    }

const deleteProduct = async(req, res) => {

    try{
            const productId = req.params.id;
            const product = await Product.findByIdAndDelete(productId);
            if(!product){
                return res.status(404).json({message: 'Product not found'});
            }
            res.status(200).json({message: 'Product deleted successfully'});
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }

}

const updateProduct = async(req, res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findByIdAndUpdate(productId, req.body);
  
        if(!product){
           return res.status(404).json({message: 'Product not found'});
        }
        const updateProduct =  await Product.findById(productId);
        res.status(200).json(updateProduct);
  
      }catch(error){
        console.log(error);
        res.status(500).json(error);
      } 
    }

module.exports ={ 
    getProducts, 
    getProductId,
    createProduct,
    deleteProduct,
    updateProduct
};