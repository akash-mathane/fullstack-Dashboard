from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Employee(db.Model):  # Change this line
    __tablename__ = 'employees'

    employee_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    birth_date = db.Column(db.Date)
    hire_date = db.Column(db.Date)
    home_phone = db.Column(db.String)
    title = db.Column(db.String)
    address = db.Column(db.String)
    country = db.Column(db.String)
    postal_code = db.Column(db.String)

    def __init__(self, first_name, last_name, birth_date, hire_date, home_phone,title ,address ,country ,postal_code ):
        self.first_name = first_name
        self.last_name = last_name
        self.birth_date = birth_date
        self.hire_date = hire_date
        self.home_phone = home_phone
        self.title = title
        self.address = address
        self.country = country
        self.postal_code = postal_code

    def __repr__(self):
        return f'<Employee {self.employee_id}>'
    
class OrderDetail(db.Model):
    __tablename__ = 'order_details'

    order_detail_id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'))
    quantity = db.Column(db.Integer)
    unit_price = db.Column(db.Float)

    # Define relationships with other tables, if needed
    # For example:
    # order = db.relationship('Order', back_populates='order_details')
    # product = db.relationship('Product', back_populates='order_details')

    def __init__(self, order_id, product_id, quantity, unit_price):
        self.order_id = order_id
        self.product_id = product_id
        self.quantity = quantity
        self.unit_price = unit_price

    def __repr__(self):
        return f'<OrderDetail {self.order_detail_id}>'
    
class Orders(db.Model):
    __tablename__ = 'orders'

    order_id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.Date)  # Add the order_date column definition

class Supplier(db.Model):
    __tablename__ = 'suppliers'

    supplier_id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String)


class Product(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(255))
    supplier_id = db.Column(db.Integer, db.ForeignKey('suppliers.supplier_id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id'))
    quantity_per_unit = db.Column(db.String(255))
    units_in_stock = db.Column(db.Integer)
    units_on_order = db.Column(db.Integer)
    reorder_level = db.Column(db.Integer)
    discontinued = db.Column(db.Boolean)

    def __init__(self, product_name, supplier_id, category_id, quantity_per_unit, units_in_stock, units_on_order, reorder_level, discontinued):
        self.product_name = product_name
        self.supplier_id = supplier_id
        self.category_id = category_id
        self.quantity_per_unit = quantity_per_unit
        self.units_in_stock = units_in_stock
        self.units_on_order = units_on_order
        self.reorder_level = reorder_level
        self.discontinued = discontinued

    def __repr__(self):
        return f'<Product {self.product_id}>'

