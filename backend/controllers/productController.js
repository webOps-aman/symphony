const Product = require("../models/Products");
const fs = require("fs");
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
        let query = {};

        // -------------------------
        // 1️⃣ CATEGORY FILTER
        // -------------------------
        if (req.query.category) {
            query.category = req.query.category;
        }

        // -------------------------
        // 2️⃣ RATING FILTER
        // -------------------------
        if (req.query.rating) {
            query.rating = { $gte: Number(req.query.rating) };
        }

        // -------------------------
        // 3️⃣ PRICE RANGE FILTER
        // -------------------------
        if (req.query.minPrice) {
            query.price = { ...query.price, $gte: Number(req.query.minPrice) };
        }

        if (req.query.maxPrice) {
            query.price = { ...query.price, $lte: Number(req.query.maxPrice) };
        }

        // -------------------------
        // 4️⃣ SEARCH FILTER
        // -------------------------
        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: "i" };
        }

        // -------------------------
        // 5️⃣ SORTING
        // -------------------------
        let sortQuery = {};
        if (req.query.sort) {
            sortQuery[req.query.sort] = req.query.order === "desc" ? -1 : 1;
        }

        // -------------------------
        // 6️⃣ FINAL QUERY (FIND + SORT)
        // -------------------------
        const productsList = await Product.find(query).sort(sortQuery);

        res.status(200).json({
            status: "Success",
            count: productsList.length,
            data: productsList,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};


const RemoveProduct = async (req, res) => {
    try {
        const productId = req.params.id; // ⭐ URL params se id
        console.log(productId)
        // 1. Fetch product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: "Error",
                message: "Product not found"
            });
        }

        // 2. Delete images (single/multiple)
        if (product.image && product.image.length > 0) {
            product.image.forEach((imgPath) => {
                const fullPath = path.join(__dirname, "..", imgPath);

                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                    console.log("Deleted Image:", fullPath);
                }
            });
        }

        // 3. Delete product
        await Product.findByIdAndDelete(productId);

        res.status(200).json({
            status: "Success",
            message: "Product + Images Deleted Successfully"
        });

    } catch (error) {
        console.log("Error deleting product:", error);
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

const SingleProductInfo = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const productInfo = await Product.findById(productId);

    if (!productInfo) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      status: "Success",
      data: productInfo
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "Error",
      message: error.message
    });
  }
};



module.exports = {
    AddProduct,
    ListProduct,
    RemoveProduct,
    SingleProductInfo,
}