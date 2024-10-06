import React, { useState, useEffect } from "react";
import HeaderAdmin from "../layout/HeaderAdmin";
import FooterAdmin from "../layout/FooterAdmin";
import orderApi from "../../api/orderApi";
import statisticApi from "../../api/statisticApi";
import QuarterlyRevenueChart from "../statistic/QuarterlyRevenueChart";
import CategoryRevenueChart from "../statistic/CategoryRevenueChart";
import ProductRevenueDonutChart from "../statistic/ProductRevenueDonutChart";
import RevenueAreaChart from "../statistic/RevenueAreaChart";
import YearlyRevenueLineChart from "../statistic/YearlyRevenueLineChart";

export default function Statistic() {
  const [orders, setOrder] = useState([]);
  const [revenueProducts, setRevenueProduct] = useState([]);
  const [inventory, setInventory] = useState(0);
  const [bestProduct, setBestProduct] = useState([]);
  const [totalSold, setTotalSold] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [tempMonth, setTempMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");

  const [quarterData, setQuarterData] = useState([0, 0, 0, 0]);
  const [revenueData, setRevenueData] = useState([]);
  const [revenueProductPie, setRevenueProductPie] = useState([]);
  const [revenueThreeYear, setRevenueThreeYear] = useState([]);
  const [revenueTwoYear, setRevenueTwoYear] = useState([]);

  const getMonthAndYear = (selectedMonth) => {
    const [year, month] = selectedMonth.split("-");
    return { month, year };
  };

  const getCurrentMonthYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  useEffect(() => {
    if (!selectedMonth) {
      const currentMonthYear = getCurrentMonthYear();
      setSelectedMonth(currentMonthYear);
      setTempMonth(currentMonthYear);
      const { month, year } = getMonthAndYear(currentMonthYear);
      setCurrentYear(year);
      setCurrentMonth(month);
    }
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const { month, year } = getMonthAndYear(selectedMonth);
      setCurrentYear(year);
      setCurrentMonth(month);
      fetchInventory(selectedMonth);
      fetchOrder(selectedMonth);
      fetchRevenueProduct(selectedMonth);
      fetchProductBestSeller(selectedMonth);
      fetchTotalSold(selectedMonth);
      fetchTotalRevenue(selectedMonth);
      fetchRevenueQuarter(selectedMonth);
      fetchRevenueCategory(selectedMonth);
      fetchRevenueProductPie(selectedMonth);
      fetchRevenueThreeYear();
      fetchRevenueTwoYear(selectedMonth);
    }
  }, [selectedMonth]);

  const fetchRevenueThreeYear = async () => {
    const quarter = await statisticApi.getRevenueThreeYear();
    setRevenueThreeYear(quarter.data);
  };

  const fetchRevenueTwoYear = async (monthYear) => {
    const { month, year } = getMonthAndYear(monthYear);
    const data = {
      month: month,
      year: year,
    };
    const quarter = await statisticApi.getRevenueTwoYear(data);
    console.log(quarter.data);
    setRevenueTwoYear(quarter.data);
  };

  const fetchRevenueCategory = async (monthYear) => {
    const { month, year } = getMonthAndYear(monthYear);
    const data = {
      month: month,
      year: year,
    };
    const quarter = await statisticApi.getRevenueCategory(data);
    setRevenueData(quarter.data);
  };

  const fetchRevenueProductPie = async (monthYear) => {
    const { month, year } = getMonthAndYear(monthYear);
    const data = {
      month: month,
      year: year,
    };
    const product = await statisticApi.getRevenueProductPie(data);
    setRevenueProductPie(product.data);
  };

  const fetchRevenueQuarter = async (monthYear) => {
    const { month, year } = getMonthAndYear(monthYear);
    const data = {
      month: month,
      year: year,
    };
    const quarter = await statisticApi.getRevenueQuarter(data);
    console.log(quarter.data.quarters);
    setQuarterData(quarter.data.quarters);
  };

  const fetchProductBestSeller = async (monthYear) => {
    const { month, year } = getMonthAndYear(monthYear);
    const data = {
      month: month,
      year: year,
    };
    const product = await statisticApi.getProductBestSeller(data);
    setBestProduct(product.data);
  };

  const fetchInventory = async (monthYear) => {
    const inventory = await statisticApi.getInventory();
    setInventory(inventory.data.ton_kho);
  };

  const fetchOrder = async (monthYear) => {
    const { month, year } = getMonthAndYear(monthYear);
    const data = {
      month: month,
      year: year,
    };
    const orders = await orderApi.getOrderInfoStatis(data);
    setOrder(orders.data);
  };

  const fetchTotalSold = async (monthYear) => {
    const { month, year } = getMonthAndYear(monthYear);
    const data = {
      month: month,
      year: year,
    };
    const total = await statisticApi.getTotalSold(data);
    console.log(total.data);
    setTotalSold(total.data);
  };

  const fetchTotalRevenue = async (monthYear) => {
    const { month, year } = getMonthAndYear(monthYear);
    const data = {
      month: month,
      year: year,
    };
    const total = await statisticApi.getTotalRevenue(data);
    setTotalRevenue(total.data);
  };

  const fetchRevenueProduct = async (monthYear) => {
    const revenue = await statisticApi.getRevenueProduct();
    setRevenueProduct(revenue.data);
  };

  const handleMonthChange = (event) => {
    setTempMonth(event.target.value); // Cập nhật giá trị tạm thời
  };

  const handleShowResults = () => {
    setSelectedMonth(tempMonth); // Cập nhật selectedMonth khi nhấn nút
  };

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", options);
  }

  return (
    <>
      <HeaderAdmin>
        <section className="order-overview-emp">
          <h1 className="container-h1-emp">THỐNG KÊ DOANH THU CORYN STORE</h1>
          <p className="description-emp">
            Here you can find a summary of all your recent orders and their
            status.
          </p>
        </section>
        <div className="dashboard-main-wrapper">
          <div className="dashboard-wrapper">
            <div className="dashboard-ecommerce">
              <div className="container-fluid dashboard-content">
                <div className="ecommerce-widget">
                  <form method="post" action="/status">
                    <div className="custom-button-group">
                      <div className="custome-time-select">
                        <div className="date-picker-container">
                          <label htmlFor="purchaseDate" className="date-label">
                          Chọn Tháng và Năm
                          </label>
                          <input
                            type="month"
                            id="purchaseDate"
                            name="rel"
                            className="input-purchaseDate"
                            required
                            value={tempMonth}
                            onChange={handleMonthChange}
                          />
                        </div>
                        <button
                          type="button"
                          className="custom-button"
                          onClick={handleShowResults}
                        >
                          Xem kết quả
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="row margin-bottom-statis">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis">
                        <div className="card-body">
                          <h5 className="text-muted">
                            Doanh thu trong tháng {currentMonth} năm{" "}
                            {currentYear}
                          </h5>
                          <h1 className="text-statis">
                            {" "}
                            {totalRevenue.revenue_by_month} VND
                          </h1>
                          <span className="metric-label float-right text-success font-weight-bold">
                            <i className="fa fa-fw fa-arrow-up"></i> 5.86%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis">
                        <div className="card-body">
                          <h5 className="text-muted">
                            Sản phẩm bán chạy tháng {currentMonth}
                          </h5>
                          <h1 className="text-statis">
                            {bestProduct &&
                            bestProduct.best_selling_product_month
                              ? bestProduct.best_selling_product_month.name
                              : "Không có sản phẩm bán chạy"}
                          </h1>
                          <span className="metric-label float-right text-info font-weight-bold">
                            <i className="fa fa-fw fa-star"></i> Top Seller
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis">
                        <div className="card-body">
                          <h5 className="text-muted">
                            Tổng số hàng đã bán trong tháng {currentMonth}
                          </h5>
                          <h1 className="text-statis">
                            {totalSold.total_sold_month}
                          </h1>
                          <span className="metric-label float-right text-success font-weight-bold">
                            <i className="fa fa-fw fa-arrow-up"></i> 7.50%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis">
                        <div className="card-body">
                          <h5 className="text-muted">
                            Số lượng hàng trong kho
                          </h5>
                          <h1 className="text-statis">{inventory}</h1>
                          <span className="metric-label float-right text-warning font-weight-bold">
                            <i className="fa fa-fw fa-exclamation-triangle"></i>{" "}
                            Tồn kho thấp
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row margin-bottom-statis">
                    <div className="col-xl-9 col-lg-12 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis">
                        <h5 className="card-header">
                          Đơn hàng trong tháng {currentMonth}
                        </h5>
                        <div className="card-body p-0">
                          <div className="table-responsive">
                            <table className="table table-statis table-striped-statis table-hover-statis">
                              <thead className="bg-light">
                                <tr className="border-0">
                                  <th className="border-0">STT</th>
                                  <th className="border-0">Tên Sản Phẩm</th>
                                  <th className="border-0">Mã Sản Phẩm</th>
                                  <th className="border-0">Số Lượng</th>
                                  <th className="border-0">Giá</th>
                                  <th className="border-0">
                                    Thời Gian Đặt Hàng
                                  </th>
                                  <th className="border-0">Khách Hàng</th>
                                  <th className="border-0">Trạng Thái</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders &&
                                  orders.map((order, index) => (
                                    <tr key={order.order_detail_id}>
                                      <td>{index + 1}</td>
                                      <td>{order.product_name}</td>
                                      <td>{order.product_id}</td>
                                      <td>{order.quantity}</td>
                                      <td>{order.price} VND</td>
                                      <td>{formatDate(order.order_time)}</td>
                                      <td>{order.customer_name}</td>
                                      <td>
                                        {order.status
                                          ? "Thành công"
                                          : "Chưa hoàn thành"}
                                      </td>
                                    </tr>
                                  ))}
                                <tr>
                                  <td colSpan="8">
                                    <a
                                      href="#"
                                      className="btn btn-outline-primary-statis float-right mt-3"
                                      style={{ padding: "10px 20px" }} // Tăng kích thước nút
                                    >
                                      Xem Chi Tiết
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis heigh-chart">
                        <h5 className="card-header">Khách hàng mới</h5>
                        <div className="card-body">
                          <YearlyRevenueLineChart data={revenueTwoYear} />
                          <div className="text-center">
                            <span className="legend-item mr-2">
                              <span className="fa-xs text-primary mr-1 legend-tile">
                                <i className="fa fa-fw fa-square-full"></i>
                              </span>
                              <span className="legend-text">
                                Khách hàng quay lại
                              </span>
                            </span>
                            <span className="legend-item mr-2">
                              <span className="fa-xs text-secondary mr-1 legend-tile">
                                <i className="fa fa-fw fa-square-full"></i>
                              </span>
                              <span className="legend-text">Lần đầu tiên</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row margin-bottom-statis">
                    {/* Danh mục sản phẩm */}
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis heigh-chart">
                        <h5 className="card-header">Danh Mục Sản Phẩm</h5>
                        <div className="card-body">
                          <CategoryRevenueChart revenueData={revenueData} />
                          <div className="text-center m-t-40">
                            {/* Legend sẽ tự động tạo từ dữ liệu */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Doanh số sản phẩm */}
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="card card-statis heigh-chart">
                        <div className="card-header">
                          <h5 className="mb-0">
                            Doanh thu theo quý năm {currentYear}
                          </h5>
                        </div>
                        <div className="card-body">
                          <QuarterlyRevenueChart
                            quarterData={quarterData}
                            currentYear={currentYear}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-12 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis">
                        <h5 className="card-header">
                          Top các sản phẩm bán chạy
                        </h5>
                        <div className="card-body p-0">
                          <div className="table-responsive">
                            <table className="p-table-statis table-statis table no-wrap ">
                              <thead className="bg-light">
                                <tr className="">
                                  <th className="">Sản phẩm</th>
                                  <th className="">Lượt mua</th>
                                  <th className="">Doanh Thu</th>
                                </tr>
                              </thead>
                              <tbody>
                                {revenueProducts &&
                                  revenueProducts.map((item, index) => (
                                    <tr key={index + 1}>
                                      <td>{item.product_name}</td>
                                      <td>{item.luot_mua}</td>
                                      <td>{item.doanh_thu}</td>
                                    </tr>
                                  ))}
                                <tr>
                                  <td colSpan="3">
                                    <a
                                      href="#"
                                      className="btn btn-outline-light float-right"
                                    >
                                      Chi Tiết
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row margin-bottom-statis">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis">
                        <div className="card-body">
                          <h5 className="text-muted">
                            Doanh thu trong năm {currentYear}
                          </h5>
                          <h1 className="text-statis">
                            {" "}
                            {totalRevenue.revenue_by_year} VND
                          </h1>
                          <span className="metric-label float-right text-success font-weight-bold">
                            <i className="fa fa-fw fa-arrow-up"></i> 5.86%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis">
                        <div className="card-body">
                          <h5 className="text-muted">
                            Sản phẩm bán chạy năm {currentYear}
                          </h5>
                          <h1 className="text-statis">
                            {bestProduct &&
                            bestProduct.best_selling_product_year
                              ? bestProduct.best_selling_product_year.name
                              : "Không có sản phẩm bán chạy"}
                          </h1>
                          <span className="metric-label float-right text-info font-weight-bold">
                            <i className="fa fa-fw fa-star"></i> Top Seller
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis">
                        <div className="card-body">
                          <h5 className="text-muted">
                            Tổng số hàng đã bán trong năm {currentYear}
                          </h5>
                          <h1 className="text-statis">
                            {totalSold.total_sold_year}
                          </h1>
                          <span className="metric-label float-right text-success font-weight-bold">
                            <i className="fa fa-fw fa-arrow-up"></i> 7.50%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="card card-statis">
                        <div className="card-body">
                          <h5 className="text-muted">
                            Số lượng hàng trong kho
                          </h5>
                          <h1 className="text-statis">{inventory}</h1>
                          <span className="metric-label float-right text-warning font-weight-bold">
                            <i className="fa fa-fw fa-exclamation-triangle"></i>{" "}
                            Tồn kho thấp
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row margin-bottom-statis">
                    {/* Doanh thu theo danh mục */}
                    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                      <div className="card card-statis heigh-chart">
                        <h5 className="card-header">Doanh thu theo sản phẩm năm {currentYear}</h5>
                        <div className="card-body">
                          <ProductRevenueDonutChart
                            revenueProduct={revenueProductPie}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Kết thúc doanh thu theo danh mục */}

                    {/* Tổng doanh thu */}
                    <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                      <div className="card card-statis">
                        <h5 className="card-header">Tổng Doanh Thu</h5>
                        <div className="card-body" style={{ height: "390px" }}>
                          <RevenueAreaChart
                            revenueDataThree={revenueThreeYear}
                          />
                        </div>
                        <div className="card-footer">
                          <p className="display-7 font-weight-bold">
                            <span className="text-primary d-inline-block">
                              $26,000
                            </span>
                            <span className="text-success float-right">
                              +9.45%
                            </span>
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
        <FooterAdmin />
      </HeaderAdmin>
    </>
  );
}
