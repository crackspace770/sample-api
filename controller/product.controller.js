const Product = require('../models/product.model.js');
const Auth = require('../models/auth.model.js'); // make sure this path is correct


const createProduct = async (req, res) => {
    try {
        // Check if user_id is present in the request
        const {email, name, name_product, price, quantity, } = req.body;

        if (!name_product || !price || !quantity || !email || !name) {
            return res.status(400).json({ 
                sukses: false,
                message: 'name, email, name_product, price, and quantity are required fields.' });
        }

             // Validate user by email
             const user = await Auth.findOne({ email });

             if (!user) {
                 return res.status(404).json({ 
                     sukses: false,
                     message: 'User with the provided email not found.'
                 });
             }
     
             // Optional: Check if name matches too
             if (user.name !== name) {
                 return res.status(401).json({
                     sukses: false,
                     message: 'Email exists but name does not match.'
                 });
             }

        const product = await Product.create(req.body);
        res.status(200).json(
           { sukses: true,
            message: 'Product created successfully',
            product: product,}
        );

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


const getProducts = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                sukses: false, 
                message: 'Email is required.' 
            });
        }

        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(404).json({ 
                sukses: false, 
                message: 'User not found.' 
            });
        }

        const products = await Product.find();
        res.status(200).json({ 
            sukses: true, 
            message: 'Product list retrieved successfully', 
            products 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            sukses: false, 
            message: 'Internal server error', 
            error 
        });
    }
};

const getProductId = async (req, res) => {
    try {
        const { id, email } = req.body;

        if (!id || !email) {
            return res.status(400).json({ 
                sukses: false, 
                message: 'Product ID and email are required.' 
            });
        }

        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(404).json({ 
                sukses: false, 
                message: 'User not found.' 
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ 
                sukses: false, 
                message: 'Product not found.' 
            });
        }

        res.status(200).json({ 
            sukses: true, 
            message: 'Product retrieved successfully', 
            product 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            sukses: false, 
            message: 'Internal server error', 
            error 
        });
    }
};




const filterProduct = async(req, res) => {
    try{
        const product = await Product.find(req.body);
        res.status(200).json(product);
    }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
}

const deleteProduct = async (req, res) => {
    try {
        const { id, email } = req.body;

        if(!email){
                
                return res.status(400).json({ 
                    sukses: false, 
                    message: 'Email is required.' 
                });
        }

        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(404).json({ 
                sukses: false, 
                message: 'User not found.' 
            });
        }

        if (!id) {
            return res.status(400).json({ 
                sukses: false, 
                message: 'Product ID is required.' 
            });
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ 
                sukses: false, 
                message: 'Product not found.' 
            });
        }

        res.status(200).json({ 
            sukses: true, 
            message: 'Product deleted successfully.' 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            sukses: false, 
            message: 'Internal server error.', 
            error 
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { id, email,...updateFields } = req.body;

        if (!email) {
                return res.status(400).json({ 
                    sukses: false, 
                    message: 'Email is required.' 
                });
        }

        
        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(404).json({ 
                sukses: false, 
                message: 'User not found.' 
            });
        }

        if (!id) {
            return res.status(400).json({ 
                sukses: false, 
                message: 'Product ID is required.' 
            });
        }

        const product = await Product.findByIdAndUpdate(id, updateFields, { new: true });

        if (!product) {
            return res.status(404).json({ 
                sukses: false, 
                message: 'Product not found.' 
            });
        }

        res.status(200).json({ 
            sukses: true, 
            message: 'Product updated successfully.', 
            product 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            sukses: false, 
            message: 'Internal server error.', 
            error 
        });
    }
};


module.exports ={ 
    getProducts, 
    getProductId,
    createProduct,
    deleteProduct,
    updateProduct
};