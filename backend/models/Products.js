const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  productHighlights: {
    type: [String]
  },
  image: {
    type: [String]
  },
  offers: {
    type: [String]
  },
  warranty: {
    summary: String,
    serviceType: String,
    coveredInWarranty: String,
    notCoveredInWarranty: String,
    domesticWarranty: String,
    internationalWarranty: String
  },
  colors: {
    type: [String]
  },
  powerConsumption: String,
  seller: {
    name: String,
    rating: Number,
    policies: String
  },
  description: String,
  specifications: {
    general: {
      salesPackage: String,
      powerRequired: String,
      tankCapacity: String,
      coolingArea: String,
      material: String,
      motorType: String,
      airDelivery: String
    },
    features: {
      speedSettings: String,
      padType: String,
      waterLevelIndicator: String,
      castorWheels: String,
      iceChambr: String,
      autoDrainPlug: String
    },
    dimensions: {
      depth: String,
      height: String,
      width: String,
      weight: String
    }
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
