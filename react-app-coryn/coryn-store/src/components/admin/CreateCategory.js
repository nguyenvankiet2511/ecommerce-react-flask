import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../layout/HeaderAdmin";
import FooterAdmin from "../layout/FooterAdmin";
import categoriesApi from "../../api/categoriesApi";

export default function CreateCategory() {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [photoCategory, setPhotoCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(""); 

  // Hàm xử lý khi chọn file hình ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhotoCategory(file);
    setImagePreview(URL.createObjectURL(file)); 
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data={
        name: name,
        photoCategory:photoCategory,
        description:description
    }
   

    try {
      await categoriesApi.add(data)
      alert("Thêm danh mục thành công!");
      setName("");
      setPhotoCategory(null);
      setDescription("");
      setImagePreview("");
    } catch (error) {
      console.error("Có lỗi khi tạo danh mục!", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handleExit = (e) => {
    e.preventDefault();
    navigate('/admin/category-manager');
    
  };

  return (
    <>
      <HeaderAdmin>
        <div className="container-admin mt-5-admin">
          <h2 className="title-admin">Tạo danh mục</h2>
          <form onSubmit={handleSubmit} className="form-admin">
            <div className="form-group-admin">
              <label htmlFor="name" className="label-admin">
                Tên danh mục
              </label>
              <input
                type="text"
                className="input-admin"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên danh mục"
                required
              />
            </div>

            <div className="form-group-admin">
              <label htmlFor="photoCategory" className="label-admin">
                Hình ảnh danh mục
              </label>
              <input
                type="file"
                className="input-admin"
                id="photoCategory"
                onChange={handleImageChange} // Sử dụng hàm mới để xử lý hình ảnh
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
                placeholder="Nhập mô tả danh mục sản phẩm"
              ></textarea>
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

