import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderAdmin from "../layout/HeaderAdmin";
import FooterAdmin from "../layout/FooterAdmin";
import categoriesApi from "../../api/categoriesApi";

export default function UpdateCategory() {
  const navigate = useNavigate();
  const { categoryId } = useParams(); // Lấy categoryId từ URL
  const [name, setName] = useState("");
  const [photoCategory, setPhotoCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchCategory();
  }, [categoryId]); // Ensure effect runs when categoryId changes

  const fetchCategory = async () => {
    try {
      const response = await categoriesApi.get(parseInt(categoryId, 10));
      setName(response.data.name);
      setDescription(response.data.description);
      setImagePreview(response.data.photoCategory); 
      console.log(response.data);
    } catch (error) {
      console.error("Không thể tải danh mục!", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhotoCategory(file);
    setImagePreview(URL.createObjectURL(file)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    if (photoCategory) {
      data.append("photoCategory", photoCategory);
    }
    data.append("description", description);

    try {
      await categoriesApi.update(categoryId, data);
      alert("Cập nhật danh mục thành công!");
      navigate('/admin/category-manager'); 
    } catch (error) {
      console.error("Có lỗi khi cập nhật danh mục!", error);
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
          <h2 className="title-admin">Cập nhật danh mục</h2>
          <form onSubmit={handleSubmit} className="form-admin">
            <div className="form-group-admin">
              <label htmlFor="name" className="label-admin">Tên danh mục</label>
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
              <label htmlFor="photoCategory" className="label-admin">Hình ảnh danh mục</label>
              <input
                type="file"
                className="input-admin"
                id="photoCategory"
                onChange={handleImageChange} 
              />
            </div>
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
              <label htmlFor="description" className="label-admin">Mô tả</label>
              <textarea
                className="textarea-admin"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="Nhập mô tả danh mục sản phẩm"
              ></textarea>
            </div>

            <button type="submit" className="btn-admin btn-primary-admin">Cập nhật</button>
            <button onClick={handleExit} className="btn-admin btn-secondary-admin">Hủy</button>
          </form>
        </div>
        <FooterAdmin />
      </HeaderAdmin>
    </>
  );
}
