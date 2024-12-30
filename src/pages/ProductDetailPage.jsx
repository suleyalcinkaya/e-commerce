import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/actions/productActions';
import Header from '../layout/Header';

function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {selectedProduct.images && selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${selectedProduct.name} - Image ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
              <p className="text-gray-600">{selectedProduct.description}</p>
              <div className="text-2xl font-bold text-blue-600">
                ₺{selectedProduct.price}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">
                  {"★".repeat(Math.round(selectedProduct.rating))}
                  {"☆".repeat(5 - Math.round(selectedProduct.rating))}
                </span>
                <span className="text-gray-600">({selectedProduct.rating})</span>
              </div>
              <div className="text-gray-600">
                Stock: {selectedProduct.stock}
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailPage;