import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronRight, Upload, X, Plus, Trash2 } from 'lucide-react';
import { addProduct } from '../api/productApi';

const AddProduct = () => {
  const { isDark } = useSelector((state) => state.theme);
  
  const [formData, setFormData] = useState({
    _id: '',
    category: '',
    name: '',
    price: '',
    originalPrice: '',
    productHighlights: [''],
    offers: [''],
    colors: [''],
    powerConsumption: '',
    description: '',
    
    // Warranty fields
    warrantySummary: '',
    warrantyServiceType: '',
    warrantyCoveredIn: '',
    warrantyNotCoveredIn: '',
    warrantyDomestic: '',
    warrantyInternational: '',
    
    // Seller fields
    sellerName: '',
    sellerRating: '',
    sellerPolicies: '',
    
    // Specifications - General
    salesPackage: '',
    powerRequired: '',
    tankCapacity: '',
    coolingArea: '',
    material: '',
    motorType: '',
    airDelivery: '',
    
    // Specifications - Features
    speedSettings: '',
    padType: '',
    waterLevelIndicator: '',
    castorWheels: '',
    iceChambr: '',
    
    // Additional features (optional)
    nightMode: '',
    remoteControl: '',
    slimDesign: '',
    autoShutoff: '',
    usbCharging: '',
    digitalTempControl: '',
    smartFeatures: '',
    
    // Dimensions
    depth: '',
    height: '',
    width: '',
    weight: ''
  });
  
  const resetForm = () => {
  setFormData({
    _id: '',
    category: '',
    name: '',
    price: '',
    originalPrice: '',
    productHighlights: [''],
    offers: [''],
    colors: [''],
    powerConsumption: '',
    description: '',

    // Warranty fields
    warrantySummary: '',
    warrantyServiceType: '',
    warrantyCoveredIn: '',
    warrantyNotCoveredIn: '',
    warrantyDomestic: '',
    warrantyInternational: '',

    // Seller fields
    sellerName: '',
    sellerRating: '',
    sellerPolicies: '',

    // Specifications - General
    salesPackage: '',
    powerRequired: '',
    tankCapacity: '',
    coolingArea: '',
    material: '',
    motorType: '',
    airDelivery: '',

    // Specifications - Features
    speedSettings: '',
    padType: '',
    waterLevelIndicator: '',
    castorWheels: '',
    iceChambr: '',

    // Optional features
    nightMode: '',
    remoteControl: '',
    slimDesign: '',
    autoShutoff: '',
    usbCharging: '',
    digitalTempControl: '',
    smartFeatures: '',

    // Dimensions
    depth: '',
    height: '',
    width: '',
    weight: ''
  });

  setImages([]); // Remove all images from preview & upload list
};


  

  const [images, setImages] = useState([]);

  // Handle simple input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array field change (productHighlights, offers, colors)
  const handleArrayFieldChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  // Add new item to array field
  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  // Remove item from array field
  const removeArrayField = (index, field) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          setImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            file: file,
            preview: event.target.result,
            name: file.name
          }]);
        };
        
        reader.readAsDataURL(file);
      }
    });
    
    e.target.value = '';
  };

  // Remove image
  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Handle form submit
  const handleSubmit = async (status) => {
    try {
      const formDataToSend = new FormData();
      
      // Basic fields
      formDataToSend.append('_id', formData._id);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('originalPrice', formData.originalPrice);
      formDataToSend.append('powerConsumption', formData.powerConsumption);
      formDataToSend.append('description', formData.description);
      
      // Arrays as JSON strings
      formDataToSend.append('productHighlights', JSON.stringify(formData.productHighlights.filter(item => item.trim())));
      formDataToSend.append('offers', JSON.stringify(formData.offers.filter(item => item.trim())));
      formDataToSend.append('colors', JSON.stringify(formData.colors.filter(item => item.trim())));
      
      // Warranty object
      formDataToSend.append('warranty', JSON.stringify({
        summary: formData.warrantySummary,
        serviceType: formData.warrantyServiceType,
        coveredInWarranty: formData.warrantyCoveredIn,
        notCoveredInWarranty: formData.warrantyNotCoveredIn,
        domesticWarranty: formData.warrantyDomestic,
        internationalWarranty: formData.warrantyInternational
      }));
      
      // Seller object
      formDataToSend.append('seller', JSON.stringify({
        name: formData.sellerName,
        rating: parseFloat(formData.sellerRating),
        policies: formData.sellerPolicies
      }));
      
      // Specifications object
      const specificationsObj = {
        general: {
          salesPackage: formData.salesPackage,
          powerRequired: formData.powerRequired,
          tankCapacity: formData.tankCapacity,
          coolingArea: formData.coolingArea,
          material: formData.material,
          motorType: formData.motorType,
          airDelivery: formData.airDelivery
        },
        features: {
          speedSettings: formData.speedSettings,
          padType: formData.padType,
          waterLevelIndicator: formData.waterLevelIndicator,
          castorWheels: formData.castorWheels,
          iceChambr: formData.iceChambr
        },
        dimensions: {
          depth: formData.depth,
          height: formData.height,
          width: formData.width,
          weight: formData.weight
        }
      };
      
      // Add optional features if filled
      if (formData.nightMode) specificationsObj.features.nightMode = formData.nightMode;
      if (formData.remoteControl) specificationsObj.features.remoteControl = formData.remoteControl;
      if (formData.slimDesign) specificationsObj.features.slimDesign = formData.slimDesign;
      if (formData.autoShutoff) specificationsObj.features.autoShutoff = formData.autoShutoff;
      if (formData.usbCharging) specificationsObj.features.usbCharging = formData.usbCharging;
      if (formData.digitalTempControl) specificationsObj.features.digitalTempControl = formData.digitalTempControl;
      if (formData.smartFeatures) specificationsObj.features.smartFeatures = formData.smartFeatures;
      
      formDataToSend.append('specifications', JSON.stringify(specificationsObj));
      
      // Images
      images.forEach((img) => {
        formDataToSend.append('image', img.file);
      });
      
      formDataToSend.append('status', status);
      
      console.log('Form Data to Send:', Object.fromEntries(formDataToSend));

      const response = await addProduct(formDataToSend);
      console.log('Success Response:', response);
      
      
      // Your API call here
      // const response = await fetch('http://localhost:5000/api/v1/product/addproduct', {
      //   method: 'POST',
      //   body: formDataToSend
      // });
      
      alert(`Product ${status === 'publish' ? 'Published' : 'Saved as Draft'} Successfully!`);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show specific error message
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Failed to add product'}`);
      } else if (error.request) {
        alert('Network Error: Please check your internet connection');
      } else {
        alert('Error: Something went wrong');
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Add Product</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 cursor-pointer hover:text-blue-500">Home</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span>Add Product</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        {/* Basic Information */}
        <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
          <h2 className="text-lg font-semibold mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product ID *</label>
              <input
                type="text"
                name="_id"
                value={formData._id}
                onChange={handleInputChange}
                placeholder="smy_product_001"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Category</option>
                <option value="desert coolers">Desert Coolers</option>
                <option value="BLDC coolers">BLDC Coolers</option>
                <option value="personal coolers">Personal Coolers</option>
                <option value="tower coolers">Tower Coolers</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Jumbo 200 EX Air Cooler, 200 litres"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="15949"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Original Price (₹)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="17499"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Power Consumption</label>
            <input
              type="text"
              name="powerConsumption"
              value={formData.powerConsumption}
              onChange={handleInputChange}
              placeholder="260 W"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Product description..."
              rows="5"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            />
          </div>
        </div>

        {/* Product Highlights */}
        <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Product Highlights</h2>
            <button
              type="button"
              onClick={() => addArrayField('productHighlights')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add Highlight
            </button>
          </div>
          
          {formData.productHighlights.map((highlight, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                type="text"
                value={highlight}
                onChange={(e) => handleArrayFieldChange(index, 'productHighlights', e.target.value)}
                placeholder="Powerful Exhaust Fan"
                className={`flex-1 px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formData.productHighlights.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(index, 'productHighlights')}
                  className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Offers */}
        <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Offers</h2>
            <button
              type="button"
              onClick={() => addArrayField('offers')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add Offer
            </button>
          </div>
          
          {formData.offers.map((offer, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <textarea
                value={offer}
                onChange={(e) => handleArrayFieldChange(index, 'offers', e.target.value)}
                placeholder="Bank Offer: 5% cashback..."
                rows="2"
                className={`flex-1 px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
              />
              {formData.offers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(index, 'offers')}
                  className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Colors */}
        <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Available Colors</h2>
            <button
              type="button"
              onClick={() => addArrayField('colors')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add Color
            </button>
          </div>
          
          {formData.colors.map((color, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                type="text"
                value={color}
                onChange={(e) => handleArrayFieldChange(index, 'colors', e.target.value)}
                placeholder="White"
                className={`flex-1 px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formData.colors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(index, 'colors')}
                  className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Warranty Information */}
        <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
          <h2 className="text-lg font-semibold mb-6">Warranty Information</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Warranty Summary</label>
            <input
              type="text"
              name="warrantySummary"
              value={formData.warrantySummary}
              onChange={handleInputChange}
              placeholder="1 Year Comprehensive Warranty"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Service Type</label>
            <textarea
              name="warrantyServiceType"
              value={formData.warrantyServiceType}
              onChange={handleInputChange}
              placeholder="For warranty claims or any product related issues..."
              rows="2"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Covered in Warranty</label>
            <textarea
              name="warrantyCoveredIn"
              value={formData.warrantyCoveredIn}
              onChange={handleInputChange}
              placeholder="Warranty covers manufacturing defects..."
              rows="3"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Not Covered in Warranty</label>
            <textarea
              name="warrantyNotCoveredIn"
              value={formData.warrantyNotCoveredIn}
              onChange={handleInputChange}
              placeholder="Physical damage, misuse, or improper installation..."
              rows="3"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Domestic Warranty</label>
              <input
                type="text"
                name="warrantyDomestic"
                value={formData.warrantyDomestic}
                onChange={handleInputChange}
                placeholder="1 Year"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">International Warranty</label>
              <input
                type="text"
                name="warrantyInternational"
                value={formData.warrantyInternational}
                onChange={handleInputChange}
                placeholder="0 Year"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Seller Information */}
        <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
          <h2 className="text-lg font-semibold mb-6">Seller Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Seller Name</label>
              <input
                type="text"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleInputChange}
                placeholder="CoolerHub India"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Seller Rating</label>
              <input
                type="number"
                step="0.1"
                name="sellerRating"
                value={formData.sellerRating}
                onChange={handleInputChange}
                placeholder="4.3"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Seller Policies</label>
            <textarea
              name="sellerPolicies"
              value={formData.sellerPolicies}
              onChange={handleInputChange}
              placeholder="7 Days Replacement Policy | GST invoice available"
              rows="2"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            />
          </div>
        </div>

        {/* Specifications - General */}
        <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
          <h2 className="text-lg font-semibold mb-6">Specifications - General</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Sales Package</label>
              <input
                type="text"
                name="salesPackage"
                value={formData.salesPackage}
                onChange={handleInputChange}
                placeholder="1 Desert Cooler, 1 User Manual, Warranty Card"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Power Required</label>
              <input
                type="text"
                name="powerRequired"
                value={formData.powerRequired}
                onChange={handleInputChange}
                placeholder="230 V, 50 Hz"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tank Capacity</label>
              <input
                type="text"
                name="tankCapacity"
                value={formData.tankCapacity}
                onChange={handleInputChange}
                placeholder="200 Litres"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cooling Area</label>
              <input
                type="text"
                name="coolingArea"
                value={formData.coolingArea}
                onChange={handleInputChange}
                placeholder="Up to 48 sq meters"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Material</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                placeholder="High-Grade ABS Plastic Body"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Motor Type</label>
              <input
                type="text"
                name="motorType"
                value={formData.motorType}
                onChange={handleInputChange}
                placeholder="Copper Motor"
                className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Air Delivery</label>
            <input
              type="text"
              name="airDelivery"
              value={formData.airDelivery}
              onChange={handleInputChange}
              placeholder="6500 m³/hr"
              className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>

        {/* Specifications - Features */}
        <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
          <h2 className="text-lg font-semibold mb-6">Specifications - Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Speed Settings</label>
          <input
            type="text"
            name="speedSettings"
            value={formData.speedSettings}
            onChange={handleInputChange}
            placeholder="3-Speed Control"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Pad Type</label>
          <input
            type="text"
            name="padType"
            value={formData.padType}
            onChange={handleInputChange}
            placeholder="3-Side Honeycomb Cooling Pads"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Water Level Indicator</label>
          <select
            name="waterLevelIndicator"
            value={formData.waterLevelIndicator}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Castor Wheels</label>
          <input
            type="text"
            name="castorWheels"
            value={formData.castorWheels}
            onChange={handleInputChange}
            placeholder="Yes (4 wheels with brakes)"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Ice Chamber</label>
        <select
          name="iceChambr"
          value={formData.iceChambr}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <h3 className="text-md font-semibold mb-4 text-gray-500">Optional Features</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Night Mode</label>
          <input
            type="text"
            name="nightMode"
            value={formData.nightMode}
            onChange={handleInputChange}
            placeholder="Yes (Ultra silent 38 dB)"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Remote Control</label>
          <input
            type="text"
            name="remoteControl"
            value={formData.remoteControl}
            onChange={handleInputChange}
            placeholder="Yes"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Slim Design</label>
          <input
            type="text"
            name="slimDesign"
            value={formData.slimDesign}
            onChange={handleInputChange}
            placeholder="Yes (Space saving)"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Auto Shutoff</label>
          <input
            type="text"
            name="autoShutoff"
            value={formData.autoShutoff}
            onChange={handleInputChange}
            placeholder="Yes (Sleep timer)"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">USB Charging</label>
          <input
            type="text"
            name="usbCharging"
            value={formData.usbCharging}
            onChange={handleInputChange}
            placeholder="Yes (2A output)"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Digital Temperature Control</label>
          <input
            type="text"
            name="digitalTempControl"
            value={formData.digitalTempControl}
            onChange={handleInputChange}
            placeholder="Yes (Precision control)"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Smart Features</label>
          <input
            type="text"
            name="smartFeatures"
            value={formData.smartFeatures}
            onChange={handleInputChange}
            placeholder="App connectivity ready"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>
    </div>

    {/* Dimensions */}
    <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
      <h2 className="text-lg font-semibold mb-6">Dimensions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Depth</label>
          <input
            type="text"
            name="depth"
            value={formData.depth}
            onChange={handleInputChange}
            placeholder="68 cm"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Height</label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            placeholder="118 cm"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Width</label>
          <input
            type="text"
            name="width"
            value={formData.width}
            onChange={handleInputChange}
            placeholder="75 cm"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Weight</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="32 kg"
            className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>
    </div>

    {/* Product Images */}
    <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6`}>
      <h2 className="text-lg font-semibold mb-6">Product Images</h2>
      
      <div className={`border-2 border-dashed ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'} rounded-lg p-12 text-center relative`}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
            <Upload size={24} className="text-gray-500" />
          </div>
          <div>
            <p className="text-gray-600 mb-1">
              <span className="text-blue-500 font-medium cursor-pointer">Click to upload</span>
              <span className="text-gray-500"> or drag and drop</span>
            </p>
            <p className="text-gray-500 text-sm">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className={`aspect-square rounded-lg overflow-hidden border-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <img
                  src={image.preview}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
              >
                <X size={16} />
              </button>
              
              <p className="mt-2 text-xs text-gray-500 truncate">{image.name}</p>
            </div>
          ))}
          
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className={`aspect-square rounded-lg border-2 border-dashed ${isDark ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'} flex flex-col items-center justify-center cursor-pointer transition-colors`}>
              <Upload size={24} className="text-gray-400 mb-2" />
              <span className="text-xs text-gray-500">Add More</span>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Action Buttons */}
    <div className="flex justify-end gap-4">
      <button
        type="button"
        onClick={() => handleSubmit('draft')}
        className={`px-8 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-100'} font-medium transition-colors`}
      >
        Save as Draft
      </button>
      <button
        type="button"
        onClick={() => handleSubmit('publish')}
        className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        Publish Product
      </button>
    </div>
  </div>
</div>
  );
}
export default AddProduct;