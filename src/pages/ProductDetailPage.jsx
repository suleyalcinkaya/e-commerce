import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/actions/productActions';
import Header from '../layout/Header';
import { ArrowLeft } from 'lucide-react';

function ProductDetailPage() {
  const { productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId]);

  const handleBack = () => {
    history.goBack();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Product not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {selectedProduct.images && selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${selectedProduct.name} - Image ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              ))}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h1>
              <p className="text-gray-600">{selectedProduct.description}</p>
              
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-blue-600">₺{selectedProduct.price}</span>
                <span className="text-green-500">
                  {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock})` : 'Out of Stock'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-xl">
                  {"★".repeat(Math.round(selectedProduct.rating))}
                  {"☆".repeat(5 - Math.round(selectedProduct.rating))}
                </span>
                <span className="text-gray-600">({selectedProduct.rating})</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{selectedProduct.sell_count} sold</span>
              </div>

              <button 
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                disabled={selectedProduct.stock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;