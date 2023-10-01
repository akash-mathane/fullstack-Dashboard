
from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
from sqlalchemy import func
from Pagesdata.Teamdata import db, Employee, OrderDetail, Orders, Supplier, Product  # Import db and Employee from Teamdata
import datetime
from decouple import config


app = Flask(__name__)

# Configure CORS to allow requests from your React app's origin (e.g., http://localhost:3000)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
DATABASE_URL = config('DATABASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
db.init_app(app)  # Initialize SQLAlchemy with your Flask app

@app.route('/api/team-members', methods=['GET'])
def get_team_members():
    employees = Employee.query.all()

    team_members = []
    for employee in employees:
        team_member = {
            'id': employee.employee_id,
            'name': employee.first_name + ' ' + employee.last_name,
            'age': datetime.date.today().year - employee.birth_date.year,
            'hire_date': employee.hire_date.strftime('%Y-%m-%d'),
            'home_phone': str(employee.home_phone)
        }
        team_members.append(team_member)

    return jsonify(team_members)


@app.route('/api/ContactInformation', methods=['GET'])
def get_ContactInformation():
    employees = Employee.query.all()  # Query the "employees" table

    ContactInformation = []
    for employee in employees:
        contact_info = {
            'id': employee.employee_id,
            'name': employee.first_name + ' ' + employee.last_name,
            'age': datetime.date.today().year - employee.birth_date.year,
            'home_phone': str(employee.home_phone),
            'title': employee.title,
            'address': employee.address,
            'country': employee.country,
            'postal_code': employee.postal_code
        }
        ContactInformation.append(contact_info)

    return jsonify(ContactInformation)

@app.route('/api/sales', methods=['GET'])
def get_sales_data():
    # Query the database to retrieve sales data by month
    sales_data = db.session.query(
        func.date_trunc('month', Orders.order_date).label('month'),
        func.sum(OrderDetail.quantity * OrderDetail.unit_price).label('total_sales')
    ).join(OrderDetail, Orders.order_id == OrderDetail.order_id) \
     .group_by('month') \
     .all()

    # Convert the result into a list of dictionaries
    sales_list = [{'month': row.month.strftime('%Y-%m-%d'), 'total_sales': float(row.total_sales)} for row in sales_data]

    return jsonify(sales_list)

@app.route('/api/supplier-distribution', methods=['GET'])
def get_supplier_distribution():
    supplier_data = db.session.query(Supplier.company_name, func.count().label('count')).group_by(Supplier.company_name).all()

    supplier_distribution = [{'company_name': row.company_name, 'count': row.count} for row in supplier_data]

    return jsonify(supplier_distribution)

@app.route('/api/recent-transactions', methods=['GET'])
def get_recent_transactions():
    # Implement logic to fetch recent transaction data
    # For example, you can query the Orders, OrderDetail, and Employees tables
    # to retrieve transaction dates, employee names, and total amounts for the last 10 transactions.

    recent_transactions = db.session.query(
        Orders.order_date.label('transaction_date'),
        Employee.first_name.label('employee_first_name'),
        Employee.last_name.label('employee_last_name'),
        func.sum(OrderDetail.quantity * OrderDetail.unit_price).label('total_amount')
    ).join(OrderDetail, Orders.order_id == OrderDetail.order_id) \
     .join(Employee, Employee.employee_id == Employee.employee_id) \
     .group_by(Orders.order_date, Employee.first_name, Employee.last_name) \
     .order_by(Orders.order_date.desc()) \
     .limit(10) \
     .all()

    # Convert the result into a list of dictionaries
    recent_transactions_data = [{
        'transaction_date': row.transaction_date.strftime('%Y-%m-%d'),
        'employee_name': f'{row.employee_first_name} {row.employee_last_name}',
        'total_amount': float(row.total_amount)
    } for row in recent_transactions]

    return jsonify(recent_transactions_data)

@app.route('/api/product-statistics', methods=['GET'])
def get_product_statistics():
    # Calculate the total number of products
    total_products = db.session.query(func.count(Product.product_id)).scalar()

    # Calculate the number of out-of-stock products (units_in_stock == 0)
    out_of_stock_products = db.session.query(func.count(Product.product_id)).filter(Product.units_in_stock == 0).scalar()

    # Define a threshold for low-stock (e.g., units_in_stock <= 10)
    low_stock_threshold = 10

    # Calculate the number of low-stock products
    low_stock_products = db.session.query(func.count(Product.product_id)).filter(Product.units_in_stock <= low_stock_threshold).scalar()

    # Create a dictionary to hold the product statistics
    product_statistics = {
        'totalProducts': total_products,
        'outOfStockProducts': out_of_stock_products,
        'lowStockProducts': low_stock_products
    }

    return jsonify(product_statistics)

@app.route('/api/database-statistics', methods=['GET'])
def get_database_statistics():
    # Implement logic to fetch database statistics here
    # You can calculate database size, count tables, and fetch recent backups

    # Example data (replace with actual database statistics)
    database_statistics = {
        'databaseSize': '10 GB',
        'numberOfTables': 5,
        'recentBackups': ['2023-09-01', '2023-08-15', '2023-07-30'],
    }

    return jsonify(database_statistics)

if __name__ == '__main__':
    app.run(debug=True)
