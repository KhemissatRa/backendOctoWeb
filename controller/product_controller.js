const Product = require('../modul/product_module')

// Create Product
const cloudinary = require("../config/cloudnary");

const CrProduct = async (req, res) => {
  try {
    console.log("req.body:", req.body);
console.log("req.file:", req.file);    // 1️⃣ Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // 2️⃣ Convert file to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // 3️⃣ Upload to Cloudinary
    let cloudRes;
    try {
      cloudRes = await cloudinary.uploader.upload(dataURI, { folder: "products" });
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      return res.status(500).json({ error: "Cloudinary upload failed" });
    }

    // 4️⃣ Create product
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      Category: req.body.Category,
      Image: cloudRes.secure_url, // ✅ safe
    });

    await product.save();
    res.json(product);


  } catch (err) {
    console.error("CrProduct error:", err);
    res.status(500).json({ error: err.message });
  }
};


// Update Product
const UpProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const cloudRes = await cloudinary.uploader.upload(dataURI, {
        folder: "products",
      });

      updateData.Image = cloudRes.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete Product
const DltProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({ message: `Cannot find product with ID ${id}` })
    }
    res.status(200).json("Product deleted successfully")
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Get All Products
const getProduct = async (req, res) => {
  try {
    const allProducts = await Product.find()
    res.status(200).json(allProducts)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Get Product by ID
const GtProductId = async (req, res) => {
  try {
    const { id } = req.params
    const productData = await Product.findById(id)

    if (!productData) {
      return res.status(404).json({ message: `Product not found with ID ${id}` })
    }

    res.status(200).json(productData)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = { CrProduct, UpProduct, DltProduct, getProduct, GtProductId }
