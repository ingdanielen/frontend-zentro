'use client';

import Input from '@/components/UX-UI/Input';
import { productService } from '@/services/products/productService';
import { Product } from '@/types/productType';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface AdminProductFormProps {
  product: Product | null;
  onClose: () => void;
  onSubmit: () => void;
  token: string | null;
}

interface FormErrors {
  name?: string;
  price?: string;
  stock?: string;
  description?: string;
  category?: string;
  brand?: string;
  color?: string;
  width?: string;
  height?: string;
  weight?: string;
  images?: string;
  rating?: string;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({
  product,
  onClose,
  onSubmit,
  token,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    category: '',
    brand: '',
    color: '',
    width: 0,
    height: 0,
    weight: 0,
    images: '',
    active: true,
    rating: 0,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    
    if (formData.stock === undefined || formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (!formData.category?.trim()) {
      newErrors.category = 'La categoría es requerida';
    }
    
    if (!formData.brand?.trim()) {
      newErrors.brand = 'La marca es requerida';
    }
    
    if (!formData.color?.trim()) {
      newErrors.color = 'El color es requerido';
    }
    
    if (!formData.width || formData.width <= 0) {
      newErrors.width = 'El ancho debe ser mayor a 0';
    }
    
    if (!formData.height || formData.height <= 0) {
      newErrors.height = 'El alto debe ser mayor a 0';
    }
    
    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = 'El peso debe ser mayor a 0';
    }

    if (formData.rating === undefined || formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'La calificación debe estar entre 0 y 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Validación para campos numéricos
    if (['price', 'stock', 'width', 'height', 'weight', 'rating'].includes(name)) {
      // Permite números, un punto decimal, y el punto al final mientras se escribe
      if (!/^-?\d*\.?\d*$/.test(value) && value !== '.') {
        return;
      }
      
      // Si el valor es solo un punto, lo dejamos como está
      if (value === '.') {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        return;
      }

      // Convertimos a número solo si no termina en punto
      setFormData((prev) => ({
        ...prev,
        [name]: value.endsWith('.') ? value : (value === '' ? '' : Number(value)),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setFormError('No hay sesión activa. Por favor, inicie sesión.');
      return;
    }

    if (!validateForm()) {
      setFormError('Por favor, corrija los errores en el formulario.');
      return;
    }

    setLoading(true);
    setFormError('');

    try {
      if (product?._id) {
        await productService.updateProduct(product._id, formData, token);
      } else {
        const newProduct = {
          name: formData.name || '',
          price: formData.price || 0,
          stock: formData.stock || 0,
          description: formData.description || '',
          category: formData.category || '',
          brand: formData.brand || '',
          color: formData.color || '',
          width: formData.width || 0,
          height: formData.height || 0,
          weight: formData.weight || 0,
          images: formData.images || '',
          active: formData.active ?? true,
          rating: formData.rating || 0
        } as Omit<Product, '_id' | 'createdAt' | '__v'>;
        await productService.createProduct(newProduct, token);
      }
      onSubmit();
    } catch (err) {
      console.error('Error saving product:', err);
      setFormError(err instanceof Error ? err.message : 'Error al guardar el producto. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-nightBlue">
              {product ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {formError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                label="Precio"
                name="price"
                type="text"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                required
                pattern="^\d*\.?\d*$"
                inputMode="decimal"
              />

              <Input
                label="Stock"
                name="stock"
                type="text"
                value={formData.stock}
                onChange={handleChange}
                error={errors.stock}
                required
                pattern="^\d*\.?\d*$"
                inputMode="decimal"
              />

              <Input
                label="Categoría"
                name="category"
                value={formData.category}
                onChange={handleChange}
                error={errors.category}
                required
              />

              <Input
                label="Marca"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                error={errors.brand}
                required
              />

              <Input
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                error={errors.color}
                required
              />

              <Input
                label="Ancho (cm)"
                name="width"
                type="text"
                value={formData.width}
                onChange={handleChange}
                error={errors.width}
                required
                pattern="^\d*\.?\d*$"
                inputMode="decimal"
              />

              <Input
                label="Alto (cm)"
                name="height"
                type="text"
                value={formData.height}
                onChange={handleChange}
                error={errors.height}
                required
                pattern="^\d*\.?\d*$"
                inputMode="decimal"
              />

              <Input
                label="Peso (kg)"
                name="weight"
                type="text"
                value={formData.weight}
                onChange={handleChange}
                error={errors.weight}
                required
                pattern="^\d*\.?\d*$"
                inputMode="decimal"
              />

              <Input
                label="Calificación (0-5)"
                name="rating"
                type="text"
                value={formData.rating}
                onChange={handleChange}
                error={errors.rating}
                pattern="^\d*\.?\d*$"
                inputMode="decimal"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`
                    w-full px-4 py-3.5 
                    bg-gray-50 border border-gray-200 rounded-2xl
                    text-gray-800 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-nightBlue/20 focus:border-nightBlue
                    transition-all duration-300
                    ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                  `}
                  required
                />
                {errors.description && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <Input
                  label="URL de la imagen"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  error={errors.images}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, active: e.target.checked }))
                    }
                    className="h-5 w-5 text-nightBlue focus:ring-nightBlue border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Producto activo
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-nightBlue text-white rounded hover:bg-nightBlue/90 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm; 