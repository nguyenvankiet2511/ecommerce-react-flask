import React, { useEffect, useState } from "react";
import HeaderEmployee from "../layout/HeaderEmployee";
import FooterEmployee from "../layout/FooterEmployee";
import productsApi from "../../api/productsApi";

export default function Payment() {
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    birthDate: "",
    address: "",
  });

  const [orderDetails, setOrderDetails] = useState({
    productID: "",
    productName: "",
    quantity: 1,
    note: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const products = await productsApi.getAll();
    setProducts(products.data);
    console.log(products.data);
  };
  const handleCustomerChange = (e) => {
    const { id, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [id]: value,
    });
  };

  const handleOrderChange = (e) => {
    const { id, value } = e.target;

    console.log(`Thay đổi ${id}: ${value}`); // Kiểm tra giá trị

    if (id === "productName") {
      const selectedProduct = products.find(
        (product) => product.id.toString() === value
      );

      console.log(selectedProduct);
      const newOrderDetails = {
        ...orderDetails,
        productID: value,
        productName: selectedProduct ? selectedProduct.name : "Không có", // Cập nhật productName
      };
      setOrderDetails(newOrderDetails);
      console.log("Chi tiết đơn hàng hiện tại:", newOrderDetails); // Kiểm tra toàn bộ orderDetails
    } else {
      const newOrderDetails = {
        ...orderDetails,
        [id]: value,
      };
      setOrderDetails(newOrderDetails);
      console.log("Chi tiết đơn hàng hiện tại:", newOrderDetails); // Kiểm tra toàn bộ orderDetails
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (orderDetails.productID) {
      // Kiểm tra productID
      // Kiểm tra xem sản phẩm đã có trong productList chưa
      const existingProductIndex = productList.findIndex(
        (product) => product.productID === orderDetails.productID
      );

      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        const updatedProductList = [...productList];
        updatedProductList[existingProductIndex].quantity += Number(
          orderDetails.quantity
        ); // Chuyển đổi sang số
        setProductList(updatedProductList);
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào danh sách
        setProductList([
          ...productList,
          {
            ...orderDetails,
            id: orderDetails.productID,
            quantity: Number(orderDetails.quantity),
          }, // Chuyển đổi sang số khi thêm mới
        ]);
      }

      // Reset chi tiết đơn hàng
      setOrderDetails({
        productID: "",
        productName: "",
        quantity: 1,
        note: "",
      });
    }
  };
  const handleConfirmPayment = () => {
    // Kiểm tra xem có sản phẩm nào trong danh sách không
    if (productList.length === 0) {
      alert("Vui lòng thêm sản phẩm trước khi xác nhận thanh toán.");
      return;
    }

    // Xử lý thanh toán ở đây
    // Ví dụ: gửi thông tin thanh toán tới API hoặc thực hiện các bước thanh toán khác

    // In ra thông tin đơn hàng để kiểm tra
    console.log("Thông tin khách hàng:", customerInfo);
    console.log("Chi tiết đơn hàng:", productList);

    // Thông báo thành công
    alert("Thanh toán thành công!");
  };

  return (
    <>
      <HeaderEmployee>
        <div className="customer-form-emp">
          <h2>Thông tin khách hàng</h2>
          <form id="customerForm-emp">
            <div className="form-row-emp">
              <label htmlFor="name" className="label-emp">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                className="input-customerId-emp"
                value={customerInfo.name}
                onChange={handleCustomerChange}
                required
              />

              <label htmlFor="phone" className="label-emp">
                Số điện thoại
              </label>
              <input
                type="text"
                id="phone"
                className="input-customerName-emp"
                value={customerInfo.phone}
                onChange={handleCustomerChange}
                required
              />

              <label htmlFor="birthDate" className="label-emp">
                Ngày sinh
              </label>
              <input
                type="date"
                id="birthDate"
                className="input-purchaseDate-emp"
                value={customerInfo.birthDate}
                onChange={handleCustomerChange}
                required
              />

              <label htmlFor="address" className="label-emp">
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                className="input-address-emp"
                value={customerInfo.address}
                onChange={handleCustomerChange}
                required
              />
            </div>
          </form>
        </div>

        <div className="customer-table-emp">
          <h2>Chi tiết đơn hàng</h2>
          <label htmlFor="productSelect" className="label-emp">
            Tên sản phẩm
          </label>
          <select
            id="productName"
            className="input-productName-emp"
            required
            value={orderDetails.productID} // Sử dụng productID ở đây
            onChange={handleOrderChange}
          >
            <option value="" disabled>
              Chọn sản phẩm
            </option>
            {products.map((product) => {
              return (
                <option key={product.id} value={product.id}>
                  ID: {product.id} - Tên: {product.name}
                </option>
              );
            })}
          </select>

          <label htmlFor="quantity" className="label-emp">
            Số lượng:
          </label>
          <input
            type="number"
            id="quantity"
            className="input-quantity-emp"
            value={orderDetails.quantity}
            onChange={handleOrderChange}
            required
          />

          <label htmlFor="note" className="label-emp">
            Ghi chú:
          </label>
          <input
            type="text"
            id="note"
            className="input-note-emp"
            value={orderDetails.note}
            onChange={handleOrderChange}
          />

          <button
            type="button"
            id="addButton-emp"
            className="button-emp"
            onClick={handleAddProduct}
          >
            <i className="fas fa-plus"></i> Thêm sản phẩm
          </button>

          <table id="customerTable-emp">
            <thead>
              <tr>
                <th>Xóa</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.id}>
                  <td>
                    <button
                      style={{ border: "none", background: "transparent" }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>{product.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="instructions-emp">
            <p>
              1. <strong>Tiến hành thanh toán:</strong> Nhấn "Gửi" để hoàn tất
              việc mua hàng. Bạn sẽ được hướng dẫn qua quá trình thanh toán.
            </p>
            <p>
              2. <strong>Xác nhận thanh toán:</strong> Làm theo các bước để xác
              nhận thanh toán và hoàn tất việc mua hàng. Xác nhận sẽ được gửi
              đến bạn ngay sau đó.
            </p>
            <button id="confirmPaymentButton-emp" className="button-emp" onClick={handleConfirmPayment}>
              <i className="fas fa-check"></i> Xác nhận thanh toán
            </button>
          </div>
        </div>

        <FooterEmployee />
      </HeaderEmployee>
    </>
  );
}
