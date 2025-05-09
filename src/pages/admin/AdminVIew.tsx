/**
 * AdminView Component
 * 
 * This component serves as the main administrative dashboard for managing products, orders, and users.
 * It includes features for:
 * - Product management (CRUD operations)
 * - Order management (placeholder for future implementation)
 * - User management (placeholder for future implementation)
 * - Role-based access control
 * - Pagination for product listing
 */

"use client";

import { useState, useEffect } from 'react';
import { Product } from '@/types/productType';
import { productService } from '@/services/products/productService';
import AdminProductForm from '@/pages/admin/AdminProductForm';
import { Plus, Package, Users } from 'lucide-react';
import AdminProductList from './AdminProductList';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

// Define the available tabs in the admin dashboard
type TabType = 'products' | 'orders' | 'users';

export default function AdminView() {
  // State management for products and UI
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('products');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Authentication state from Redux store
  const { token, user, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // Authentication check - redirect to login if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  /**
   * Fetches products from the API with pagination support
   * @param page - Current page number
   * @param limit - Number of items per page
   */
  const fetchProducts = async (page: number = currentPage, limit: number = itemsPerPage) => {
    try {
      setLoading(true);
      const response = await productService.searchProducts({ page, limit });
      if (response.success && response.data) {
        setProducts(response.data.items);
        setTotalItems(response.data.total);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when the products tab is active
  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [activeTab]);

  // Handlers for pagination, product editing, and form management
  const handlePageChange = (page: number, limit: number) => {
    setCurrentPage(page);
    setItemsPerPage(limit);
    fetchProducts(page, limit);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleFormSubmit = async () => {
    await fetchProducts();
    handleFormClose();
  };

  /**
   * Renders the content based on the active tab
   * Currently implements:
   * - Products tab: Full CRUD functionality
   * - Orders tab: Placeholder for future implementation
   * - Users tab: Placeholder for future implementation
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-nightBlue">Gestión de Productos</h2>
              <button
                onClick={handleCreate}
                className="bg-nightBlue text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-nightBlue/90 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Plus size={20} />
                Nuevo Producto
              </button>
            </div>

            <AdminProductList
              products={products}
              loading={loading}
              onEdit={handleEdit}
              onRefresh={() => fetchProducts()}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </>
        );
      case 'orders':
        return (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
              <Package size={64} className="mx-auto mb-6 text-nightBlue/20" />
              <h2 className="text-2xl font-bold text-nightBlue mb-4">Gestión de Órdenes</h2>
              <p className="text-gray-600 mb-2">Próximamente: Panel de gestión de órdenes</p>
              <p className="text-sm text-gray-500">Aquí podrás ver y gestionar todas las órdenes de tus clientes</p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
              <Users size={64} className="mx-auto mb-6 text-nightBlue/20" />
              <h2 className="text-2xl font-bold text-nightBlue mb-4">Gestión de Usuarios</h2>
              <p className="text-gray-600 mb-2">Próximamente: Panel de gestión de usuarios</p>
              <p className="text-sm text-gray-500">Aquí podrás administrar los usuarios de tu plataforma</p>
            </div>
          </div>
        );
    }
  };

  // Main component render
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section with title and description */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-nightBlue mb-2">Módulo de Administración</h1>
              <p className="text-gray-600">Gestiona tus productos, órdenes y usuarios</p>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap gap-2 sm:gap-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`${
                  activeTab === 'products'
                    ? 'border-nightBlue text-nightBlue bg-nightBlue/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start rounded-t-lg transition-all duration-200`}
              >
                <Package size={20} />
                Productos
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`${
                  activeTab === 'orders'
                    ? 'border-nightBlue text-nightBlue bg-nightBlue/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start rounded-t-lg transition-all duration-200`}
              >
                <Package size={20} />
                Órdenes
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`${
                  activeTab === 'users'
                    ? 'border-nightBlue text-nightBlue bg-nightBlue/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start rounded-t-lg transition-all duration-200`}
              >
                <Users size={20} />
                Usuarios
              </button>
            </nav>
          </div>
        </div>

        {/* Main content area */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Modal for product form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4">
            <AdminProductForm
              product={selectedProduct}
              onClose={handleFormClose}
              onSubmit={handleFormSubmit}
              token={token}
            />
          </div>
        </div>
      )}
    </div>
  );
}
