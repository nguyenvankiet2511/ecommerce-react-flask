import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import categoriesApi from "../api/categoriesApi";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import productsApi from "../api/productsApi";
import cartApi from "../api/cartApi";
import { CartProvider} from "./context/CartContext";
import { useCart } from "./context/CartContext";


export default function Shop() {

  const { updateCartCount } = useCart();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchCategories();
    fetchProductsByCategory();
  }, [params.categoryId]);

  const fetchProductsByCategory = async () => {
    const categoryId = parseInt(params.categoryId, 10);
    let productsList = [];
    if (categoryId == -1) {
      productsList = await productsApi.getAll();
    } else {
      productsList = await categoriesApi.getProductsByCategoryId(
        parseInt(params.categoryId, 10)
      );
    }
    setProducts(productsList.data);
  };

  const fetchCategories = async () => {
    try {
      const categoryList = await categoriesApi.getAll();
      setCategories(categoryList.data);
      console.log(categoryList.data);
    } catch (err) {
      console.log("Error");
    }
  };
  const addProductToCart = async (product) => {
    try {
      const data = {
        product_id: product.id,
        customer_id: localStorage.getItem('user_id'),
        quantity: 1,
      };
      const response = await cartApi.addCart(data);
      const count = await cartApi.getCountCartByUserId(localStorage.getItem('user_id'));
        updateCartCount(count.data.cart_count);
      if (response.status === 200) { // Check if the response status is OK
        alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
      } else {
        alert('Không thêm được sản phẩm vào giỏ hàng!');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart.');
    }
  };
  return (
   <>
      <CartProvider>
        <Header />
        <section className="ftco-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-lg-10 order-md-last">
                <div className="row margin-top-items">
                  {products.map((product) => {
                    return (
                      <div className="col-sm-12 col-md-12 col-lg-4 d-flex">
                        <div className="product d-flex flex-column">
                          <Link
                            to={`/products/${product.id}`}
                            className="img-prod"
                          >
                            <img
                              className="img-fluid"
                              src={`/images/${product.imageProduct}`}
                              alt="Product Image"
                            />
                            <span className="status">
                              {product.discount}% Off
                            </span>
                            <div className="overlay"></div>
                          </Link>
                          <div className="text py-3 pb-4 px-3">
                            <div className="d-flex">
                              <div className="cat">
                                <span>Lifestyle</span>
                              </div>
                              <div className="rating">
                                <p className="text-right mb-0">
                                  <a href="#">
                                    <span className="ion-ios-star-outline"></span>
                                  </a>
                                  <a href="#">
                                    <span className="ion-ios-star-outline"></span>
                                  </a>
                                  <a href="#">
                                    <span className="ion-ios-star-outline"></span>
                                  </a>
                                  <a href="#">
                                    <span className="ion-ios-star-outline"></span>
                                  </a>
                                  <a href="#">
                                    <span className="ion-ios-star-outline"></span>
                                  </a>
                                </p>
                              </div>
                            </div>
                            <h3>
                              <Link to="/products">{product.name}</Link>
                            </h3>
                            <div className="pricing">
                              <p className="price">
                                <span className="mr-2 price-dc">
                                  {product.price}VND
                                </span>
                                <span className="price-sale">
                                  {product.price -
                                    (product.price * product.discount) / 100}
                                  VND
                                </span>
                              </p>
                            </div>
                            <p className="bottom-area d-flex px-3">
                              <a
                                href="#"
                                className="add-to-cart text-center py-2 mr-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  addProductToCart(product);
                                }}
                              >
                                <span>
                                  Add to cart{" "}
                                  <i className="ion-ios-add ml-1"></i>
                                </span>
                              </a>
                              <a href="#" className="buy-now text-center py-2">
                                Buy now
                                <span>
                                  <i className="ion-ios-cart ml-1"></i>
                                </span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="row mt-5">
                  <div className="col text-center">
                    <div className="block-27">
                      <ul>
                        <li>
                          <a href="#">&lt;</a>
                        </li>
                        <li className="active">
                          <span>1</span>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                        <li>
                          <a href="#">4</a>
                        </li>
                        <li>
                          <a href="#">5</a>
                        </li>
                        <li>
                          <a href="#">&gt;</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-2">
                <div className="sidebar">
                  <div className="sidebar-box-2">
                    <h2 className="heading">Categories</h2>
                    <div className="fancy-collapse-panel">
                      <div
                        className="panel-group"
                        id="accordion"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        <Link to={`/category/${-1}`}>
                          <div className="panel panel-default">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a>All</a>
                              </h4>
                            </div>
                          </div>
                        </Link>
                        {categories.map((category) => {
                          return (
                            <Link to={`/category/${category.id}`}>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a>{category.name}</a>
                                  </h4>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-box-2">
                    <h2 className="heading">Price Range</h2>
                    <form method="post" className="colorlib-form-2">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label for="guests">Price from:</label>
                            <div className="form-field">
                              <i className="icon icon-arrow-down3"></i>
                              <select
                                name="people"
                                id="people"
                                className="form-control"
                              >
                                <option value="#">1</option>
                                <option value="#">200</option>
                                <option value="#">300</option>
                                <option value="#">400</option>
                                <option value="#">1000</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label for="guests">Price to:</label>
                            <div className="form-field">
                              <i className="icon icon-arrow-down3"></i>
                              <select
                                name="people"
                                id="people"
                                className="form-control"
                              >
                                <option value="#">2000</option>
                                <option value="#">4000</option>
                                <option value="#">6000</option>
                                <option value="#">8000</option>
                                <option value="#">10000</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </CartProvider>
      </>
  );
}
