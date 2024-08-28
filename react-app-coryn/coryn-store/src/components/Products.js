import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productsApi from "../api/productsApi";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default function Products() {
  const params = useParams();
  const [product, setProduct] = useState([null]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProductId();
    fetchProducts();
  }, [params.productId]); 
  const fetchProductId = async () =>{
    const product = await productsApi.getProductById(parseInt(params.productId,10));
    setProduct(product.data);
    console.log(product.data);
    };
  const fetchProducts = async () => {
    try {
      const productsList = await productsApi.getAll();
      setProducts(productsList.data);
      console.log(productsList.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  return (
    <>
      <Header />
      <div>
        <section className="ftco-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-5 ">
                <a
                  href={`/images/${product.imageProduct}`}
                  className="image-popup prod-img-bg"
                >
                  <img
                    src={`/images/${product.imageProduct}`}
                    className="img-product-single"
                    alt="Colorlib Template"
                  />
                </a>
              </div>
              <div className="col-lg-6 product-details pl-md-5 ">
                <h3>{product.name}</h3>
                <div className="rating d-flex">
                  <p className="text-left mr-4">
                    <a href="#" className="mr-2">
                      5.0
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
                    <a href="#">
                      <span className="ion-ios-star-outline"></span>
                    </a>
                  </p>
                  <p className="text-left mr-4">
                    <a href="#" className="mr-2" style={{ color: "#000" }}>
                      100 <span style={{ color: "#bbb" }}>Rating</span>
                    </a>
                  </p>
                  <p className="text-left">
                    <a href="#" className="mr-2" style={{ color: "#000" }}>
                      500 <span style={{ color: "#bbb" }}>Sold</span>
                    </a>
                  </p>
                </div>
                <p className="price">
                  <span>{product.price-(product.price*(1-product.discount/100))}</span>
                </p>
                <p>
                  {product.description }
                </p>
                <p>On her way she met a copy...</p>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="form-group d-flex">
                      <div className="select-wrap">
                        <div className="icon">
                          <span className="ion-ios-arrow-down"></span>
                        </div>
                        <select name="" id="" className="form-control">
                          <option value="">Small</option>
                          <option value="">Medium</option>
                          <option value="">Large</option>
                          <option value="">Extra Large</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-100"></div>
                  <div className="input-group col-md-6 d-flex mb-3">
                    <span className="input-group-btn mr-2">
                      <button
                        type="button"
                        className="quantity-left-minus btn"
                        data-type="minus"
                        data-field=""
                      >
                        <i className="ion-ios-remove"></i>
                      </button>
                    </span>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      className="quantity form-control input-number"
                      value="1"
                      min="1"
                      max="100"
                    />
                    <span className="input-group-btn ml-2">
                      <button
                        type="button"
                        className="quantity-right-plus btn"
                        data-type="plus"
                        data-field=""
                      >
                        <i className="ion-ios-add"></i>
                      </button>
                    </span>
                  </div>
                  <div className="w-100"></div>
                  <div className="col-md-12">
                    <p style={{ color: "#000" }}>80 piece available</p>
                  </div>
                </div>
                <p>
                  <a href="cart.html" className="btn btn-black py-3 px-5 mr-2">
                    Add to Cart
                  </a>
                  <a href="cart.html" className="btn btn-primary py-3 px-5">
                    Buy now
                  </a>
                </p>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-12 nav-link-wrap">
                <div
                  className="nav nav-pills d-flex text-center"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link  active mr-lg-1"
                    id="v-pills-1-tab"
                    data-toggle="pill"
                    href="#v-pills-1"
                    role="tab"
                    aria-controls="v-pills-1"
                    aria-selected="true"
                  >
                    Description
                  </a>
                  <a
                    className="nav-link  mr-lg-1"
                    id="v-pills-2-tab"
                    data-toggle="pill"
                    href="#v-pills-2"
                    role="tab"
                    aria-controls="v-pills-2"
                    aria-selected="false"
                  >
                    Manufacturer
                  </a>
                  <a
                    className="nav-link "
                    id="v-pills-3-tab"
                    data-toggle="pill"
                    href="#v-pills-3"
                    role="tab"
                    aria-controls="v-pills-3"
                    aria-selected="false"
                  >
                    Reviews
                  </a>
                </div>
              </div>
              <div className="col-md-12 tab-wrap">
                <div className="tab-content bg-light" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-1"
                    role="tabpanel"
                    aria-labelledby="v-pills-1-tab"
                  >
                    <div className="p-4">
                      <h3 className="mb-4">Nike Free RN 2019 iD</h3>
                      <p>On her way she met a copy...</p>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-2"
                    role="tabpanel"
                    aria-labelledby="v-pills-2-tab"
                  >
                    <div className="p-4">
                      <h3 className="mb-4">Manufactured By Nike</h3>
                      <p>On her way she met a copy...</p>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-3"
                    role="tabpanel"
                    aria-labelledby="v-pills-3-tab"
                  >
                    <div className="row p-4">
                      <div className="col-md-7">
                        <h3 className="mb-4">23 Reviews</h3>
                        <div className="review">
                          <div
                            className="user-img"
                            style={{
                              backgroundImage: "url(images/person_1.jpg)",
                            }}
                          ></div>
                          <div className="desc">
                            <h4>
                              <span className="text-left">Jacob Webb</span>
                              <span className="text-right">14 March 2018</span>
                            </h4>
                            <p className="star">
                              <span>
                                <i className="ion-ios-star-outline"></i>
                                <i className="ion-ios-star-outline"></i>
                                <i className="ion-ios-star-outline"></i>
                                <i className="ion-ios-star-outline"></i>
                                <i className="ion-ios-star-outline"></i>
                              </span>
                              <span className="text-right">
                                <a href="#" className="reply">
                                  <i className="icon-reply"></i>
                                </a>
                              </span>
                            </p>
                            <p>When she reached the first hills...</p>
                          </div>
                        </div>
                        {/* Add more reviews as needed */}
                      </div>
                      <div className="col-md-4">
                        <div className="rating-wrap">
                          <h3 className="mb-4">Give a Review</h3>
                          <p className="star">
                            <span>
                              <i className="ion-ios-star-outline"></i>
                              <i className="ion-ios-star-outline"></i>
                              <i className="ion-ios-star-outline"></i>
                              <i className="ion-ios-star-outline"></i>
                              <i className="ion-ios-star-outline"></i>
                              (98%)
                            </span>
                            <span>20 Reviews</span>
                          </p>
                          {/* Add more star ratings as needed */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-light">
          <div className="container">
            <div className="row justify-content-center mb-3 pb-3">
              <div className="col-md-12 heading-section text-center ">
                <h2 className="mb-4">Các sản phẩm nổi bật</h2>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {products.map((product) => {
                return (
                  <div className="col-sm-12 col-md-6 col-lg-3 d-flex">
                    <div className="product d-flex flex-column">
                    <Link to={`/products/${product.id}`} className="img-prod">
                      <img
                        className="img-fluid"
                        src={`/images/${product.imageProduct}`}
                        alt="Product Image"
                      />
                      <span className="status">{product.discount}% Off</span>
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
                          <a href="#">{product.name}</a>
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
                          >
                            <span>
                              Add to cart <i className="ion-ios-add ml-1"></i>
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
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
