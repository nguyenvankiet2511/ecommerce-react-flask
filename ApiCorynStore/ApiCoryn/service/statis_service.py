from datetime import datetime

from flask import jsonify
from sqlalchemy import func, extract

from ApiCoryn import db
from ApiCoryn.model import Products, OrderDetails, Orders, Categories


def doanh_thu_san_pham_theo_thang_nam(thang, nam):
    doanh_thu = (
        db.session.query(
            Products.name,
            func.sum((OrderDetails.quantity * OrderDetails.price) * (1 - OrderDetails.discount / 100)).label(
                'doanh_thu'),
            func.sum(OrderDetails.quantity).label('luot_mua')
        )
        .join(OrderDetails, OrderDetails.product_id == Products.id)
        .join(Orders, Orders.id == OrderDetails.order_id)
        .filter(extract('month', Orders.orderDate) == thang)
        .filter(extract('year', Orders.orderDate) == nam)
        .group_by(Products.id, Products.name)
        .order_by(func.sum(OrderDetails.quantity).desc())
    ).all()

    doanh_thu_list = []
    for row in doanh_thu:
        doanh_thu_list.append({
            "product_name": row.name,
            "doanh_thu": row.doanh_thu,
            "luot_mua": row.luot_mua
        })

    # Trả về dữ liệu dưới dạng JSON
    return jsonify(doanh_thu_list)


def tong_ton_kho():
    tong_kho = db.session.query(func.sum(Products.unitsInStock)).scalar()
    return jsonify(ton_kho=tong_kho)


# Sản phẩm bán chạy
def get_best_selling_product(month, year):
    # Truy vấn sản phẩm bán chạy nhất trong tháng
    best_selling_product_month = (
        db.session.query(
            Products.name,
            func.sum(OrderDetails.quantity).label('total_sold')
        )
        .join(OrderDetails, OrderDetails.product_id == Products.id)
        .join(Orders, Orders.id == OrderDetails.order_id)
        .filter(extract('year', Orders.orderDate) == year)
        .filter(extract('month', Orders.orderDate) == month)
        .group_by(Products.name)
        .order_by(func.sum(OrderDetails.quantity).desc())
        .first()
    )

    # Kết quả cho sản phẩm bán chạy trong tháng
    if best_selling_product_month:
        best_selling_result_month = {
            'name': best_selling_product_month[0],
            'total_sold': best_selling_product_month[1]
        }
    else:
        best_selling_result_month = {
            'name': "Không có",
            'total_sold': 0
        }

    # Truy vấn sản phẩm bán chạy nhất trong năm
    best_selling_product_year = (
        db.session.query(
            Products.name,
            func.sum(OrderDetails.quantity).label('total_sold')
        )
        .join(OrderDetails, OrderDetails.product_id == Products.id)
        .join(Orders, Orders.id == OrderDetails.order_id)
        .filter(extract('year', Orders.orderDate) == year)
        .group_by(Products.name)
        .order_by(func.sum(OrderDetails.quantity).desc())
        .first()
    )

    # Kết quả cho sản phẩm bán chạy trong năm
    if best_selling_product_year:
        best_selling_result_year = {
            'name': best_selling_product_year[0],
            'total_sold': best_selling_product_year[1]
        }
    else:
        best_selling_result_year = {
            'name': "Không có",
            'total_sold': 0
        }

    # Trả về kết quả
    return jsonify({
        'best_selling_product_month': best_selling_result_month,
        'best_selling_product_year': best_selling_result_year
    })


# so lượng đã bán
def get_total_items_sold(month, year):
    total_sold_year = (
                          db.session.query(func.sum(OrderDetails.quantity).label("total_items_sold"))
                          .join(Orders, Orders.id == OrderDetails.order_id)
                          .filter(Orders.active == True)
                          .filter(extract('year', Orders.orderDate) == year)
                          .scalar()
                      ) or 0
    total_sold_month = (
                           db.session.query(func.sum(OrderDetails.quantity).label("total_items_sold"))
                           .join(Orders, Orders.id == OrderDetails.order_id)
                           .filter(Orders.active == True)
                           .filter(extract('year', Orders.orderDate) == year)
                           .filter(extract('month', Orders.orderDate) == month)
                           .scalar()
                       ) or 0

    return jsonify({
        "total_sold_year": total_sold_year,
        "total_sold_month": total_sold_month
    })


def get_revenue(month, year):
    revenue_by_year = (
                          db.session.query(func.sum(Orders.totalAmount).label("total_revenue"))
                          .filter(extract('year', Orders.orderDate) == year)
                          .filter(Orders.active == True)
                          .scalar()
                      ) or 0

    revenue_by_month = (
                           db.session.query(func.sum(Orders.totalAmount).label("total_revenue"))
                           .filter(extract('year', Orders.orderDate) == year)
                           .filter(extract('month', Orders.orderDate) == month)
                           .filter(Orders.active == True)
                           .scalar()
                       ) or 0

    return jsonify({
        "revenue_by_year": revenue_by_year,
        "revenue_by_month": revenue_by_month
    })


# daonh thu theo quý
def get_revenue_by_quarter(year):
    result = []
    for quarter in range(1, 5):
        start_month = (quarter - 1) * 3 + 1
        end_month = quarter * 3

        query = (
            db.session.query(
                func.coalesce(func.sum(Orders.totalAmount), 0).label('total_revenue')
            )
            .filter(
                extract('year', Orders.orderDate) == year,
                extract('month', Orders.orderDate) >= start_month,
                extract('month', Orders.orderDate) <= end_month
            )
            .scalar()
        )
        result.append(query if query else 0)
    return result


def doanh_thu_theo_danh_muc(thang, nam):
    doanh_thu = (
        db.session.query(
            Categories.id.label('category_id'),
            Categories.name.label('category_name'),

            func.sum((OrderDetails.quantity * OrderDetails.price) * (1 - OrderDetails.discount / 100)).label(
                'doanh_thu'),
        )
        .join(Products, Products.category_id == Categories.id)
        .join(OrderDetails, OrderDetails.product_id == Products.id)
        .join(Orders, Orders.id == OrderDetails.order_id)
        .filter(extract('year', Orders.orderDate) == nam)
        .filter(extract('month', Orders.orderDate) == thang)
        .filter(Orders.active == True)  # Chỉ lấy các đơn hàng có active = True
        .group_by(Categories.id, Categories.name)
    ).all()

    # Chuyển kết quả truy vấn thành từ điển
    danh_sach_doanh_thu = {item.category_id: item.doanh_thu for item in doanh_thu}

    # Truy vấn tất cả danh mục
    all_categories = db.session.query(Categories).all()

    # Tạo danh sách kết quả
    ket_qua = []
    for category in all_categories:
        ket_qua.append({
            'category_id': category.id,
            'category_name': category.name,
            'doanh_thu': danh_sach_doanh_thu.get(category.id, 0)
        })

    # Trả về kết quả dưới dạng JSON
    return jsonify(ket_qua)


def get_revenue_product(thang, nam):
    doanh_thu = (
        db.session.query(
            Products.name,
            func.sum((OrderDetails.quantity * OrderDetails.price) * (1 - OrderDetails.discount / 100)).label(
                'doanh_thu'),
            func.sum(OrderDetails.quantity).label('luot_mua')
        )
        .join(OrderDetails, OrderDetails.product_id == Products.id)
        .join(Orders, Orders.id == OrderDetails.order_id)
        .filter(extract('month', Orders.orderDate) == thang)
        .filter(extract('year', Orders.orderDate) == nam)
        .group_by(Products.id, Products.name)
    ).all()

    ket_qua = [
        {
            'product_name': item.name,
            'doanh_thu': item.doanh_thu,
            'luot_mua': item.luot_mua
        }
        for item in doanh_thu
    ]

    # Trả về kết quả dưới dạng JSON
    return jsonify(ket_qua)
def get_revenue_last_3_years():
    current_year = datetime.now().year

    # Tạo danh sách các năm gần nhất (3 năm)
    years = [current_year - i for i in range(3)]

    # Truy vấn doanh thu theo năm và quý
    revenue_by_quarter = (
        db.session.query(
            extract('year', Orders.orderDate).label('year'),
            extract('quarter', Orders.orderDate).label('quarter'),
            func.sum(Orders.totalAmount).label('total_revenue')
        )
        .filter(Orders.active == True)  # Chỉ tính các đơn hàng đã xác nhận
        .filter(extract('year', Orders.orderDate).in_(years))  # Lọc theo các năm gần nhất
        .group_by(extract('year', Orders.orderDate), extract('quarter', Orders.orderDate))
        .order_by(extract('year', Orders.orderDate).desc(),
                  extract('quarter', Orders.orderDate))  # Sắp xếp theo năm và quý
        .all()
    )

    # Định dạng kết quả
    result = {year: {1: 0, 2: 0, 3: 0, 4: 0} for year in years}
    for year, quarter, total_revenue in revenue_by_quarter:
        result[year][quarter] = total_revenue

    # Trả về kết quả dưới dạng JSON
    return jsonify(result)


def get_revenue_last_2_years(year):
    # Lấy năm hiện tại và năm trước dựa trên tham số đầu vào
    current_year = (int)(year)
    previous_year = (int)(current_year - 1)

    # Truy vấn doanh thu cho 2 năm gần nhất (năm hiện tại và năm trước)
    revenue_last_2_years = (
        db.session.query(
            extract('year', Orders.orderDate).label('year'),
            func.sum(OrderDetails.price * OrderDetails.quantity * ((100 - OrderDetails.discount) / 100)).label('total_revenue')
        )
        .join(OrderDetails, Orders.id == OrderDetails.order_id)
        .filter(Orders.active == True)  # Chỉ tính các đơn hàng đã xác nhận
        .filter(extract('year', Orders.orderDate).in_([previous_year, current_year]))  # Lọc theo 2 năm cần tính
        .group_by(extract('year', Orders.orderDate))
        .all()
    )

    # Chuyển đổi kết quả truy vấn thành dictionary
    result = {year: total_revenue for year, total_revenue in revenue_last_2_years}

    # Nếu thiếu dữ liệu năm hiện tại hoặc năm trước, đặt giá trị mặc định là 0
    if previous_year not in result:
        result[previous_year] = 0
    if current_year not in result:
        result[current_year] = 0

    # Trả về kết quả dưới dạng JSON
    return jsonify(result)