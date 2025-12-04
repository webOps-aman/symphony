import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { getProductById } from "../api/productApi"; // <-- YOUR API FUNCTION

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Product Using API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductById(productId); // API CALL

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Add To Cart Handler
  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      };

      dispatch(addToCart(cartItem));

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      setQuantity(1);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout page
    // navigate('/checkout');
  };

  // Loading State UI
  if (loading || !product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Price Discount Calculation
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const images = Array.isArray(product.image)
    ? product.image
    : [product.image];

  return (
    <div className="w-full min-h-screen bg-gray-50 mt-10">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">Added to cart successfully!</span>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="cursor-pointer hover:text-blue-600">Home</span>
            <span className="mx-2">&gt;</span>
            <span className="cursor-pointer hover:text-blue-600">
              {product.category}
            </span>
            <span className="mx-2">&gt;</span>
            <span className="cursor-pointer hover:text-blue-600">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Image Gallery */}
          <div className="w-2/5 bg-white rounded-lg p-6 sticky top-6 self-start">
            <div className="flex gap-4">
              {images.length > 1 && (
                <div className="flex flex-col gap-3">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 border-2 rounded-lg cursor-pointer overflow-hidden transition-all ${
                        selectedImage === idx
                          ? "border-blue-500 shadow-md"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="flex-1 relative">
                <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain p-4"
                  />
                </div>

                {/* Quantity Selector */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">
                    Quantity:
                  </span>

                  <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                    >
                      −
                    </button>

                    <span className="w-12 text-center font-medium text-gray-800">
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    ADD TO CART
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Details */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-6 mb-4">
              {/* Title */}
              <h1 className="text-xl font-normal text-gray-800 mb-3">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-medium text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-base text-green-600 font-medium">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>

              {/* Offers */}
              {product.offers && (
                <div className="mb-6">
                  <h3 className="font-semibold text-base mb-3">
                    Available offers
                  </h3>

                  <div className="space-y-2">
                    {product.offers.slice(0, 4).map((offer, idx) => (
                      <div key={idx} className="flex gap-2 text-sm">
                        <svg
                          className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        </svg>

                        <span>
                          <span className="font-semibold">Bank Offer</span>{" "}
                          {offer.replace("Bank Offer: ", "")}
                        </span>
                      </div>
                    ))}

                    {product.offers.length > 4 && (
                      <button className="text-blue-600 text-sm font-semibold hover:underline ml-7">
                        View {product.offers.length - 4} more offers
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-sm text-gray-700 mb-3">
                    Color
                  </h3>

                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`cursor-pointer transition-all ${
                          selectedColor === idx
                            ? "opacity-100"
                            : "opacity-60 hover:opacity-80"
                        }`}
                      >
                        <div className="w-14 h-16 rounded-lg overflow-hidden border-2 border-gray-300">
                          <img
                            src={
                              Array.isArray(product.image)
                                ? product.image[0]
                                : product.image
                            }
                            alt={color}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {product.productHighlights && (
                <div className="mb-6">
                  <h3 className="font-semibold text-base mb-3">Highlights</h3>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {product.productHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-gray-700 flex items-start"
                      >
                        <span className="mr-2">•</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-base mb-3">Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="bg-white rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-base mb-4">
                  Specifications
                </h3>

                {Object.entries(product.specifications).map(
                  ([category, specs]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h4 className="font-medium text-gray-700 mb-3 capitalize bg-gray-50 px-3 py-2 rounded">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </h4>

                      <div className="space-y-3 px-3">
                        {Object.entries(specs).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex border-b border-gray-100 pb-2"
                          >
                            <span className="w-2/5 text-sm text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>

                            <span className="w-3/5 text-sm text-gray-900 font-medium">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
