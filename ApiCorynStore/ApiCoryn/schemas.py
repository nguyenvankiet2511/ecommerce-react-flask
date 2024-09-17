from ApiCoryn import ma
from ApiCoryn.model import UsersRole
from marshmallow import fields

class UsersRoleField(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        return value.name  # Serialize thành tên của enum (hoặc .value nếu bạn muốn giá trị số)

    def _deserialize(self, value, attr, data, **kwargs):
        return UsersRole[value]  # Hoặc UsersRole(value) nếu bạn serialize thành giá trị số

# Schema cho Accounts
class AccountsSchema(ma.Schema):
    users_role_id = UsersRoleField()
    class Meta:
        fields = ('id', 'name', 'email', 'username', 'password', 'active', 'users_role_id', 'user_id')

# Schema cho Users
# class UsersSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'name', 'gender', 'birthDate', 'phone', 'email', 'address', 'photoInf', 'photoPath')
#
# # Schema cho Employees
# class EmployeesSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'degree')
#
# # Schema cho Customers
# class CustomersSchema(ma.Schema):
#     class Meta:
#         fields = ('id')
#
# Schema cho BillingAddress
class BillingAddressSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'phone', 'address', 'addressDetail', 'customer_id')
#
# Schema cho Categories
class CategoriesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'photoCategory')
#
# Schema cho Products
class ProductsSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'price', 'description', 'imageProduct', 'category_id', 'unitsInStock', 'discount', 'createdDate', 'updatedDate')

# # Schema cho FeedbackCustomers
# class FeedbackCustomersSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'account_id', 'comment')
#
# # Schema cho FeedbackProduct
# class FeedbackProductSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'user_id', 'product_id', 'rating', 'comment')
#
# Schema cho Shippers
class ShippersSchema(ma.Schema):
    class Meta:
        fields = ('id', 'companyName', 'phone', 'fee')
#
# # Schema cho Orders
# class OrdersSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'customer_id', 'employee_id', 'shipper_id', 'billingAddress_id', 'paymentMethods', 'orderDate', 'active', 'totalAmount')
#
# # Schema cho OrderDetails
# class OrderDetailsSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'order_id', 'product_id', 'quantity', 'price', 'discount')
#
# Schema cho Carts
class CartsSchema(ma.Schema):
    class Meta:
        fields = ('id', 'customer_id', 'product_id', 'quantity', 'price', 'discount')
#
# # Schema cho Messages
# class MessagesSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'account_id', 'content')
#
# # Schema cho OrderReturn
# class OrderReturnSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'order_id', 'reason', 'returnDate', 'active', 'status', 'employee_id', 'processedDate')
