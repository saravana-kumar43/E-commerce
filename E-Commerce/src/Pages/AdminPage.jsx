import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AdminPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: "₹10.00", stock: 25, image: "https://via.placeholder.com/50", details: "Sample product details." }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: "", price: "", stock: "", details: "", image: "" });

  const openModal = (product = null) => {
    setIsEditMode(!!product);
    setCurrentProduct(product || { id: null, name: "", price: "", stock: "", details: "", image: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (isEditMode) {
      setProducts(products.map((product) => (product.id === currentProduct.id ? currentProduct : product)));
    } else {
      setProducts([...products, { ...currentProduct, id: products.length + 1 }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 mt-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Admin Dashboard</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => openModal()}>
          <FaPlus /> Add Product
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full">
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">{product.id}</td>
                <td className="p-3"><img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" /></td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">{product.details}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600" onClick={() => openModal(product)}>
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700" onClick={() => handleDelete(product.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Product" : "Add Product"}</h2>
            <input type="text" name="name" placeholder="Product Name" value={currentProduct.name} onChange={handleInputChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="price" placeholder="Product Price" value={currentProduct.price} onChange={handleInputChange} className="w-full p-2 border rounded mb-2" />
            <input type="number" name="stock" placeholder="Stock" value={currentProduct.stock} onChange={handleInputChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="details" placeholder="Details" value={currentProduct.details} onChange={handleInputChange} className="w-full p-2 border rounded mb-2" />
            <input type="file" name="image" placeholder="Image URL" value={currentProduct.image} onChange={handleInputChange} className="w-full p-2 border rounded mb-4" />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={closeModal}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={handleSave}>{isEditMode ? "Update" : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
