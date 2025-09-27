import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const categories = [
  "Electronics", "Mobile Phones", "Laptops", "Accessories", "Headphones",
  "Food", "Books", "Clothes/shoes", "Beauty/health", "Sports", "Outdoor", "Home"
];

export default function ProductCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    seller: "",
    stock: "",
    photo: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }

      await axios.post("/api/products", formData);
      toast.success("Product created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="product-create-card">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="product-form">

        <div className="row">
          <div className="col">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
          </div>
          <div className="col">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
          </div>
        </div>

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <div className="row">
          <div className="col">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>Seller</label>
            <input
              type="text"
              name="seller"
              value={form.seller}
              onChange={handleChange}
              placeholder="Seller Name"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock Quantity"
              required
            />
          </div>
          <div className="col">
            <label>Product Image</label>
            <label className="file-upload">
              {form.photo ? form.photo.name : "Browse"}
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                style={{ display: "none" }}
                required
              />
            </label>
            {preview && (
              <div className="preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn">Create Product</button>
      </form>

      <style jsx>{`
        .product-create-card {
          max-width: 700px;
          margin: 2rem auto;
          padding: 2rem;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .product-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .row {
          display: flex;
          gap: 1rem;
        }

        .col {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        input, select, textarea {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        textarea {
          resize: vertical;
        }

        .file-upload {
          display: inline-block;
          padding: 10px 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          background-color: #f0f0f0;
          cursor: pointer;
          text-align: center;
          margin-top: 4px;
        }

        .preview {
          margin-top: 8px;
        }

        .preview img {
          max-width: 80px;
          max-height: 80px;
          border-radius: 6px;
          object-fit: cover;
        }

        .submit-btn {
          margin-top: 1.5rem;
          padding: 12px 20px;
          background-color: #ff7043;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .submit-btn:hover {
          background-color: #f4511e;
        }

        @media (max-width: 600px) {
          .row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
