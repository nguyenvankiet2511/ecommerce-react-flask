import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoriesApi from "../../api/categoriesApi"; // Có vẻ bạn cần sửa tên này nếu thực sự gọi sản phẩm
import HeaderAdmin from "../layout/HeaderAdmin";
import FooterAdmin from "../layout/FooterAdmin";
import productsApi from "../../api/productsApi";

export default function ProductsManager() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.getAll(); 
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = async (id) => { 
    try {
      await productsApi.changeActive(id);
      fetchProducts();
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", options);
  }


  return (
    <>
      <HeaderAdmin>
        <div className="container-order-emp">
          <section className="order-overview-emp">
            <h1 className="container-h1-emp">DANH SÁCH SẢN PHẨM</h1>
            <p className="description-emp">
              Here you can find a summary of all your recent orders and their status.
            </p>
          </section>

          <div className="row">
            <div className="col-md-12 customer-with-emp">
              <h2>Danh sách sản phẩm</h2>
              <div className="search-container-order-emp">
                <input
                  type="text"
                  id="searchInput1"
                  className="form-control-emp"
                  placeholder="Search..."
                />
              </div>
              <Link to="/admin/create-product">
                <button className="btn btn-warning btn-xs confirm-btn-emp">
                  <i className="fa fa-plus"></i> Tạo mới
                </button>
              </Link>
              <div className="table-responsive-emp">
                <table
                  id="mytable1"
                  className="table-emp table-bordered-emp table-striped-emp"
                >
                  <thead>
                    <tr>
                      <th>Mã sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      
                      
                      <th>Mô tả</th>
                      <th>Giá</th>
                      <th>Tồn kho</th>
                      <th>Giảm giá</th>
                      <th>Danh mục</th>
                      <th>Ngày tạo</th>
                      <th>Ngày cập nhật</th>
                      <th>Trạng thái</th>
                      <th>Sửa</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="table-tbody-emp">
                    {products.map((product, index) => ( 
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        
    
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.unitsInStock}</td>
                        <td>{product.discount}</td>
                        <td>{product.category_name}</td>
                        <td>{formatDate(product.createdDate)}</td>
                        <td>{formatDate(product.updatedDate)}</td> 
                        <td>{product.active ? 'Đang sử dụng' : 'Ngừng sử dụng'}</td> 
                       
                        <td>
                          <Link to={`/admin/update-product/${product.id}`}>
                          
                            <button
                              className="btn btn-primary btn-xs edit-btn-emp"
                              data-id={product.id}
                            >
                              <i className="fa fa-pencil-alt"></i>
                            </button>
                          </Link>
                        </td>
                        <td>
                        <button
                            className={`btn btn-xs ${
                              product.active ? "btn-success" : "btn-danger"
                            } delete-btn-emp`}
                            onClick={() => handleDeleteProduct(product.id)} 
                          > <i className="fa fa-sync-alt"></i></button>
                         
                           
                      
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
