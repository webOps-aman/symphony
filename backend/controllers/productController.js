const Product = require("../models/Products");
const path = require("path");

const AddProduct = async (req, res) => {
    try {
        const {
            _id,
            category,
            name,
            price,
            originalPrice,
            productHighlights,
            offers,
            warranty,
            colors,
            powerConsumption,
            seller,
            description,
            specifications
        } = req.body;

        // ----------------------------------------
        // 1. Save Multiple Images (Local Storage)
        // ----------------------------------------
        let imageUrls = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                // LOCAL FILE PATH (EXAMPLE: uploads/1738001201-product.jpg)
                const filePath = `uploads/${file.filename}`;
                imageUrls.push(filePath);
            }
        }

        // ----------------------------------------
        // 2. Create Product Object
        // ----------------------------------------
        const productData = {
            _id,
            category,
            name,
            price: Number(price),
            originalPrice: originalPrice ? Number(originalPrice) : undefined,
            productHighlights: productHighlights ? JSON.parse(productHighlights) : [],
            image: imageUrls,
            offers: offers ? JSON.parse(offers) : [],
            warranty: warranty ? JSON.parse(warranty) : {},
            colors: colors ? JSON.parse(colors) : [],
            powerConsumption,
            seller: seller ? JSON.parse(seller) : {},
            description,
            specifications: specifications ? JSON.parse(specifications) : {}
        };

        // ----------------------------------------
        // 3. Save to DB
        // ----------------------------------------
        const product = new Product(productData);
        await product.save();

        res.status(201).json({
            status: "Success",
            message: "Product Added Successfully",
            product
        });

    } catch (error) {
        console.log("Error adding product:", error);
        res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

const ListProduct = async (req, res) => {
    try {
        const productsList = await Product.find({});
        res.status(200).json({
            status: "Success",
            data: productsList,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
}

const RemoveProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.body.id);
        res.status(200).json({
            status: "Success",
            message: "Product remove Successfully"
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
}

const SingleProductInfo = async (req, res) => {
    try {
        const productId = req.body.id;
        console.log(productId)
        const productInfo = await Product.findById(productId);
        res.status(200).json({
            status: "Success",
            data: productInfo
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
}


module.exports = {
    AddProduct,
    ListProduct,
    RemoveProduct,
    SingleProductInfo
}