import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../layout/HeaderAdmin";
import FooterAdmin from "../layout/FooterAdmin";
import categoriesApi from "../../api/categoriesApi"; // Đảm bảo rằng bạn có API cho danh mục

export default function CreateProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageProduct, setImageProduct] = useState(null);
  const [unitsInStock, setUnitsInStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(""); 

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error("Không thể tải danh mục!", error);
    }
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageProduct(file);
    setImagePreview(URL.createObjectURL(file));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("imageProduct", imageProduct);
    formData.append("unitsInStock", unitsInStock);
    formData.append("discount", discount);
    formData.append("category_id", categoryId); 

    try {
      await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Thêm sản phẩm thành công!");
      setName("");
      setPrice(0);
      setDescription("");
      setImageProduct(null);
      setUnitsInStock(0);
      setDiscount(0);
      setImagePreview("");
      setCategoryId(""); 
    } catch (error) {
      console.error("Có lỗi khi tạo sản phẩm!", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handleExit = (e) => {
    e.preventDefault();
    navigate("/admin/product-manager"); 
  };

  return (
    <>
      <HeaderAdmin>
        <div className="container-admin mt-5-admin">
          <h2 className="title-admin">Tạo sản phẩm</h2>
          <form onSubmit={handleSubmit} className="form-admin">
            <div className="form-group-admin">
              <label htmlFor="name" className="label-admin">
                Tên sản phẩm
              </label>
              <input
                type="text"
                className="input-admin"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>

            <div className="form-group-admin">
              <label htmlFor="price" className="label-admin">
                Giá
              </label>
              <input
                type="number"
                className="input-admin"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Nhập giá sản phẩm"
                required
              />
            </div>

            <div className="form-group-admin">
              <label htmlFor="imageProduct" className="label-admin">
                Hình ảnh sản phẩm
              </label>
              <input
                type="file"
                className="input-admin"
                id="imageProduct"
                onChange={handleImageChange}
                required
              />
            </div>
            {/* Hiển thị ảnh xem trước nếu có */}
            {imagePreview && (
              <div className="image-preview-admin">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            )}

            <div className="form-group-admin">
              <label htmlFor="description" className="label-admin">
                Mô tả
              </label>
              <textarea
                className="textarea-admin"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="Nhập mô tả sản phẩm"
              ></textarea>
            </div>

            <div className="form-group-admin">
              <label htmlFor="unitsInStock" className="label-admin">
                Tồn kho
              </label>
              <input
                type="number"
                className="input-admin"
                id="unitsInStock"
                value={unitsInStock}
                onChange={(e) => setUnitsInStock(e.target.value)}
                placeholder="Nhập số lượng tồn kho"
                required
              />
            </div>

            <div className="form-group-admin">
              <label htmlFor="discount" className="label-admin">
                Giảm giá
              </label>
              <input
                type="number"
                className="input-admin"
                id="discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Nhập phần trăm giảm giá"
              />
            </div>

            <div className="form-group-admin">
              <label htmlFor="category" className="label-admin">
                Danh mục sản phẩm
              </label>
              <select
                className="input-admin"
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="" disabled>Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-admin btn-primary-admin">
              Tạo
            </button>
            <button
              onClick={handleExit}
              className="btn-admin btn-secondary-admin"
            >
              Hủy
            </button>
          </form>
        </div>
        <FooterAdmin />
      </HeaderAdmin>
    </>
  );
}
