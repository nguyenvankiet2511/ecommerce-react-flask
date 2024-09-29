import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderEmployee from "../layout/HeaderEmployee";
import FooterEmployee from "../layout/FooterEmployee";
import categoriesApi from "../../api/categoriesApi";
import HeaderAdmin from "../layout/HeaderAdmin";
import FooterAdmin from "../layout/FooterAdmin";

export default function CategoriesManager() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await categoriesApi.getAll();
    setCategories(response.data);
  };
  const handleDeleteCategory = async (id) => {
    try {
      await categoriesApi.remove(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <HeaderAdmin>
        <div className="container-order-emp">
          <section className="order-overview-emp">
            <h1 className="container-h1-emp">DANH MỤC SẢN PHẨM</h1>
            <p className="description-emp">
              Here you can find a summary of all your recent orders and their
              status.
            </p>
          </section>

          <div className="row">
            <div className="col-md-12 customer-with-emp">
              <h2>Danh sách danh mục sản phẩm</h2>
              <div className="search-container-order-emp">
                <input
                  type="text"
                  id="searchInput1"
                  className="form-control-emp"
                  placeholder="Search..."
                />
              </div>
              <Link to="/admin/create-category">
                <button className="btn btn-warning btn-xs confirm-btn-emp">
                  {" "}
                  <i className="fa fa-plus"></i>Tạo mới
                </button>
              </Link>
              <div className="table-responsive-emp">
                <table
                  id="mytable1"
                  className="table-emp table-bordered-emp table-striped-emp"
                >
                  <thead>
                    <tr>
                      <th>Mã danh mục</th>
                      <th>Tên danh mục</th>
                      <th>Hình ảnh</th>
                      <th>Mô tả</th>
                      <th>Sửa</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="table-tbody-emp">
                    {categories.map((category, index) => (
                      <tr key={index}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.photoCategory}</td>
                        <td>####</td>

                        <td>
                          <Link to={`/admin/update-category/${category.id}`}>
                            <button
                              className="btn btn-primary btn-xs edit-btn-emp"
                              data-id={category.id}
                            >
                              <i className="fa fa-pencil-alt"></i>
                            </button>
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-xs delete-btn-emp"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <FooterAdmin />
      </HeaderAdmin>
    </>
  );
}
