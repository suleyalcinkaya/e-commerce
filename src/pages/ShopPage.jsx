import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSort, setFilter } from '../store/actions/productActions';
import Header from '../layout/Header';
import CategoryList from '../components/CategoryList';
import { Grid, List } from 'lucide-react';

function createSlug(name) {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
    
}

function ShopPage() {
  const { gender, category, categoryId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { productList, loading, error, sort, filter, total } = useSelector(state => state.product);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    dispatch(setSort(newSort));
    dispatch(fetchProducts({
      ...(categoryId && categoryId !== '0' && { category: categoryId }),
      ...(filter && { filter }),
      sort: newSort,
      limit: productsPerPage,
      offset: 0
    }));
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    dispatch(setFilter(newFilter));
    dispatch(fetchProducts({
      ...(categoryId && categoryId !== '0' && { category: categoryId }),
      ...(sort && { sort }),
      filter: newFilter,
      limit: productsPerPage,
      offset: 0
    }));
  };

  const handleFilterClick = () => {
    const params = {};
    if (categoryId) params.category = categoryId;
    if (sort) params.sort = sort;
    if (filter) params.filter = filter;
    dispatch(fetchProducts(params));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const offset = (newPage - 1) * productsPerPage;
    
    const params = {
      ...(categoryId && { category: categoryId }),
      ...(sort && { sort }),
      ...(filter && { filter }),
      limit: productsPerPage,
      offset: offset
    };
    
    dispatch(fetchProducts(params));
  };

  useEffect(() => {
    const params = {
      ...(categoryId && categoryId !== '0' && { category: categoryId }),
      ...(sort && { sort }),
      ...(filter && { filter }),
      limit: productsPerPage,
      offset: (currentPage - 1) * productsPerPage
    };
    console.log('Fetching products with params:', params);
    dispatch(fetchProducts(params));
  }, [dispatch, categoryId, sort, filter, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, sort, filter]);

  useEffect(() => {
    if (categoryId) {
      history.push(`/shop/${gender}/${category}/${categoryId}`);
    }
  }, [categoryId]);

  const totalPages = Math.ceil(total / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryList />
      
      <div className="container mx-auto px-4 py-6 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Shop</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>&gt;</span>
            <span>Shop</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 flex-1">
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

            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Filter products..."
                className="border p-2 rounded flex-1"
              />
              <button 
                onClick={handleFilterClick}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Filter
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : ''}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : ''}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 p-4">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            : "flex flex-col gap-4"
          }>
            {productList.map(product => {
              const slug = createSlug(product.name);
              const productUrl = `/shop/${gender || 'erkek'}/${category || 'category'}/${categoryId || '0'}/${slug}/${product.id}`;
              
              return (
                <div className='display flex flex-col space-between '> 
                <div key={product.id} className={`display flex flex-col space-between min-h-[450px] border rounded-lg p-4 hover:shadow-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'flex gap-4' : ''
                }`}>
                  <Link 
                    to={productUrl} 
                    className={`block h-full cursor-pointer transition-transform hover:-translate-y-1 ${
                      viewMode === 'list' ? 'flex gap-4' : ''
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      {product.images && product.images[0] && (
                        <img 
                          src={product.images[0].url} 
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      <div className="p-4 flex-grow">
                        <h3 className="font-semibold text-gray-800 hover:text-blue-600">{product.name}</h3>
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
                      </div>
                    </div>
                  </Link>
                  <button className=" w-full mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded ${
                      currentPage === pageNum 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;