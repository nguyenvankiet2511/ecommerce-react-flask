import React from 'react';
import HeaderAdmin from '../layout/HeaderAdmin';
import FooterAdmin from '../layout/FooterAdmin';

export default function HomeAdmin() {
  return (
    <>
      <HeaderAdmin>
        <div className="hero_area-emp">
          <div className="slider_container-emp">
            <div className="main_slider-emp">
              <div
                className="slide-emp"
                style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/slide-04.jpg)` }}
              ></div>
            </div>
            <div className="slider_content-emp">
              <div className="container-emp fill_height-emp">
                <div className="row-emp align-items-center-emp fill_height-emp">
                  <div className="col-emp">
                    <div className="main_slider_content-emp">
                      <h6>Spring / Summer Collection 2017</h6>
                      <h1>Get up to 30% Off New Arrivals</h1>
                      <div className="red_button-emp shop_now_button-emp">
                        <a href="#">shop now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterAdmin /> 
      </HeaderAdmin>
     
    </>
  );
}
