import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSort, setFilter } from '../store/actions/productActions';
import Header from '../layout/Header';
import CategoryList from '../components/CategoryList';

function createSlug(name) {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

function ShopPage() {
  const { gender, category, categoryId } = useParams();
  const dispatch = useDispatch();
  const { productList, loading, error, sort, filter } = useSelector(state => state.product);

  // Handle sort change
  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  // Fetch products when params change
  useEffect(() => {
    console.log('Fetching products with params:', { categoryId, sort, filter }); // Debug log
    dispatch(fetchProducts({ category: categoryId, sort, filter }));
  }, [dispatch, categoryId, sort, filter]);

  console.log('Current state:', { loading, error, productList }); // Debug log

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryList />
      
      {/* Filters */}
      <div className="container mx-auto p-4 flex gap-4">
        <select 
          value={sort} 
          onChange={handleSortChange}
          className="border p-2 rounded"
        >
          <option value="">Sort by...</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="rating:asc">Rating: Low to High</option>
          <option value="rating:desc">Rating: High to Low</option>
        </select>

        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter products..."
          className="border p-2 rounded"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 p-4">
          Error: {error}
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productList && productList.map(product => {
            const slug = createSlug(product.name);
            const productUrl = `/shop/${gender || 'erkek'}/${category || 'category'}/${categoryId || '0'}/${slug}/${product.id}`;
            
            return (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                <Link to={productUrl}>
                  {product.images && product.images[0] && (
                    <img 
                      src={product.images[0].url} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-semibold">₺{product.price}</span>
                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-400">
                      {"★".repeat(Math.round(product.rating))}
                      {"☆".repeat(5 - Math.round(product.rating))}
                    </span>
                    <span className="ml-1 text-gray-600">({product.rating})</span>
                  </div>
                </Link>
                <button className="w-full mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ShopPage;