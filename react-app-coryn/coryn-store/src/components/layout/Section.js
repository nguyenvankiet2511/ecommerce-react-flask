import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsApi from "../../api/productsApi";
import axios from "axios";
import categoriesApi from "../../api/categoriesApi";
export default function Section() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const productsList = await productsApi.getAll();
      setProducts(productsList.data);
      console.log(productsList.data);
    } catch (err) {
      console.log("Error");
    }
  };
  return (
    <div>
      <section>
        <div
          class="main_slider"
          style={{ backgroundImage: `url('/images/slider_1.jpg')` }}
        >
          <div class="container fill_height">
            <div class="row align-items-center fill_height">
              <div class="col">
                <div class="main_slider_content">
                  <h6>Spring / Summer Collection 2017</h6>
                  <h1>Get up to 30% Off New Arrivals</h1>
                  <div class="red_button shop_now_button">
                    <a href="#">shop now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row no-gutters ftco-services">
            <div className="col-lg-4 text-center d-flex align-self-stretch light-col-4">
              <div className="media block-6 services p-4 py-md-5">
                <div className="icon d-flex justify-content-center align-items-center mb-4">
                  <span className="flaticon-bag"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Free Shipping</h3>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center d-flex align-self-stretch light-col-4">
              <div className="media block-6 services p-4 py-md-5">
                <div className="icon d-flex justify-content-center align-items-center mb-4">
                  <span className="flaticon-customer-service"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Support Customer</h3>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center d-flex align-self-stretch light-col-4">
              <div className="media block-6 services p-4 py-md-5">
                <div className="icon d-flex justify-content-center align-items-center mb-4">
                  <span className="flaticon-payment-security"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Secure Payments</h3>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" bg-light">
        <div className="container">
          <div className="row justify-content-center mb-3 pb-3">
            <div className="col-md-12 heading-section text-center ">
              <h2 className="mb-4">New Shoes Arrival</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {products.map((product) => {
              return (
                <div className="col-sm-12 col-md-6 col-lg-3 d-flex">
                  <div className="product d-flex flex-column">
                    <a href="#" className="img-prod">
                      <img
                        className="img-fluid"
                        src={`images/${product.imageProduct}`}
                        alt="Colorlib Template"
                      />
                      <span className="status">{product.discount}% Off</span>
                      <div className="overlay"></div>
                    </a>
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
            <div className="col-sm-12 col-md-6 col-lg-3 d-flex">
              <div className="product d-flex flex-column">
                <a href="#" className="img-prod">
                  <img
                    className="img-fluid"
                    src="images/shoes-1.png"
                    alt="Colorlib Template"
                  />
                  <span className="status">10% Off</span>
                  <div className="overlay"></div>
                </a>
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
                    <a href="#">Produts1</a>
                  </h3>
                  <div className="pricing">
                    <p className="price">
                      <span className="mr-2 price-dc">120000VND</span>
                      <span className="price-sale">2300000VND</span>
                    </p>
                  </div>
                  <p className="bottom-area d-flex px-3">
                    <a href="#" className="add-to-cart text-center py-2 mr-1">
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
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-choose ftco-no-pb ftco-no-pt">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-4">
              <div
                className="choose-wrap divider-one img p-5 d-flex align-items-end"
                style={{ backgroundImage: `url('/images/choose-1.jpg')` }}
              >
                <div className="text text-center text-white px-2">
                  <span className="subheading">Men's Shoes</span>
                  <h2>Men's Collection</h2>
                  <p>
                    Separated they live in Bookmarksgrove right at the coast of
                    the Semantics, a large language ocean.
                  </p>
                  <p>
                    <Link to="/" className="btn btn-black px-3 py-2">
                      Shop now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row no-gutters choose-wrap divider-two align-items-stretch">
                <div className="col-md-12">
                  <div
                    className="choose-wrap full-wrap img align-self-stretch d-flex align-item-center justify-content-end"
                    style={{ backgroundImage: `url('/images/choose-2.jpg')` }}
                  >
                    <div className="col-md-7 d-flex align-items-center">
                      <div className="text text-white px-5">
                        <span className="subheading">Women's Shoes</span>
                        <h2>Women's Collection</h2>
                        <p>
                          Separated they live in Bookmarksgrove right at the
                          coast of the Semantics, a large language ocean.
                        </p>
                        <p>
                          <Link to="/xxx" className="btn btn-black px-3 py-2">
                            Shop now
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row no-gutters">
                    <div className="col-md-6">
                      <div className="choose-wrap wrap img align-self-stretch bg-light d-flex align-items-center">
                        <div className="text text-center px-5">
                          <span className="subheading">Summer Sale</span>
                          <h2>Extra 50% Off</h2>
                          <p>
                            Separated they live in Bookmarksgrove right at the
                            coast of the Semantics, a large language ocean.
                          </p>
                          <p>
                            <a href="#" className="btn btn-black px-3 py-2">
                              Shop now
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="choose-wrap wrap img align-self-stretch d-flex align-items-center"
                        style={{
                          backgroundImage: `url('/images/choose-3.jpg')`,
                        }}
                      >
                        <div className="text text-center text-white px-5">
                          <span className="subheading">Shoes</span>
                          <h2>Best Sellers</h2>
                          <p>
                            Separated they live in Bookmarksgrove right at the
                            coast of the Semantics, a large language ocean.
                          </p>
                          <p>
                            <a href="#" className="btn btn-black px-3 py-2">
                              Shop now
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-deal bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src="/images/prod-1.png"
                className="img-fluid"
                alt="Product"
              />
            </div>
            <div className="col-md-6">
              <div className="heading-section heading-section-white">
                <span className="subheading">Deal of the month</span>
                <h2 className="mb-3">Deal of the month</h2>
              </div>
              <div id="timer" className="d-flex mb-4">
                <div className="time" id="days"></div>
                <div className="time pl-4" id="hours"></div>
                <div className="time pl-4" id="minutes"></div>
                <div className="time pl-4" id="seconds"></div>
              </div>
              <div className="text-deal">
                <h2>
                  <a href="#">Nike Free RN 2019 iD</a>
                </h2>
                <p className="price">
                  <span className="mr-2 price-dc">$120.00</span>
                  <span className="price-sale">$80.00</span>
                </p>
                <ul className="thumb-deal d-flex mt-4">
                  <li
                    className="img"
                    style={{ backgroundImage: `url('/images/product-6.png')` }}
                  ></li>
                  <li
                    className="img"
                    style={{ backgroundImage: `url('/images/product-2.png')` }}
                  ></li>
                  <li
                    className="img"
                    style={{ backgroundImage: `url('/images/product-4.png')` }}
                  ></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimony-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="services-flow">
                <div className="services-2 p-4 d-flex ">
                  <div className="icon">
                    <span className="flaticon-bag"></span>
                  </div>
                  <div className="text">
                    <h3>Free Shipping</h3>
                    <p className="mb-0">
                      Separated they live in. A small river named Duden flows
                    </p>
                  </div>
                </div>
                <div className="services-2 p-4 d-flex ">
                  <div className="icon">
                    <span className="flaticon-heart-box"></span>
                  </div>
                  <div className="text">
                    <h3>Valuable Gifts</h3>
                    <p className="mb-0">
                      Separated they live in. A small river named Duden flows
                    </p>
                  </div>
                </div>
                <div className="services-2 p-4 d-flex ">
                  <div className="icon">
                    <span className="flaticon-payment-security"></span>
                  </div>
                  <div className="text">
                    <h3>All Day Support</h3>
                    <p className="mb-0">
                      Separated they live in. A small river named Duden flows
                    </p>
                  </div>
                </div>
                <div className="services-2 p-4 d-flex">
                  <div className="icon">
                    <span className="flaticon-customer-service"></span>
                  </div>
                  <div className="text">
                    <h3>All Day Support</h3>
                    <p className="mb-0">
                      Separated they live in. A small river named Duden flows
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="heading-section  mb-5">
                <h2 className="mb-4">Our satisfied customer says</h2>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                  Separated they live in
                </p>
              </div>
              <div className="carousel-testimony owl-carousel">
                <div className="item">
                  <div className="testimony-wrap">
                    <div
                      className="user-img mb-4"
                      style={{ backgroundImage: `url('/images/person_1.jpg')` }}
                    >
                      <span className="quote d-flex align-items-center justify-content-center">
                        <i className="icon-quote-left"></i>
                      </span>
                    </div>
                    <div className="text">
                      <p className="mb-4 pl-4 line">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Garreth Smith</p>
                      <span className="position">Marketing Manager</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="testimony-wrap">
                    <div
                      className="user-img mb-4"
                      style={{ backgroundImage: `url('/images/person_2.jpg')` }}
                    >
                      <span className="quote d-flex align-items-center justify-content-center">
                        <i className="icon-quote-left"></i>
                      </span>
                    </div>
                    <div className="text">
                      <p className="mb-4 pl-4 line">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Garreth Smith</p>
                      <span className="position">Interface Designer</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="testimony-wrap">
                    <div
                      className="user-img mb-4"
                      style={{ backgroundImage: `url('/images/person_3.jpg')` }}
                    >
                      <span className="quote d-flex align-items-center justify-content-center">
                        <i className="icon-quote-left"></i>
                      </span>
                    </div>
                    <div className="text">
                      <p className="mb-4 pl-4 line">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Garreth Smith</p>
                      <span className="position">UI Designer</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="testimony-wrap">
                    <div
                      className="user-img mb-4"
                      style={{ backgroundImage: `url('/images/person_1.jpg')` }}
                    >
                      <span className="quote d-flex align-items-center justify-content-center">
                        <i className="icon-quote-left"></i>
                      </span>
                    </div>
                    <div className="text">
                      <p className="mb-4 pl-4 line">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Garreth Smith</p>
                      <span className="position">Web Developer</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="testimony-wrap">
                    <div
                      className="user-img mb-4"
                      style={{ backgroundImage: `url('/images/person_1.jpg')` }}
                    >
                      <span className="quote d-flex align-items-center justify-content-center">
                        <i className="icon-quote-left"></i>
                      </span>
                    </div>
                    <div className="text">
                      <p className="mb-4 pl-4 line">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Garreth Smith</p>
                      <span className="position">System Analyst</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
