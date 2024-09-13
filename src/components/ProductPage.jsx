
import React, { useState } from 'react';
import { useGetProductsQuery, useUpdateProductMutation } from "../services/Apislice"
import './Product.css';

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formValues, setFormValues] = useState({ title: '', price: '' });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormValues({ title: product.title, price: product.price });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProduct) {
      try {
        await updateProduct({ id: selectedProduct.id, ...formValues }).unwrap();
        setSelectedProduct(null);
        setFormValues({ title: '', price: '' });
      } catch (err) {
        console.error('Update failed: ', err);
      }
    }
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.title} - ${product.price}</span>
            <button onClick={() => handleEditClick(product)}>Edit</button>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <form onSubmit={handleSubmit}>
          <h2>Edit Product</h2>
          <div>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit">Update Product</button>
          <button type="button" onClick={() => setSelectedProduct(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ProductList;
