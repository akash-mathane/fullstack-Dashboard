import React, { Component } from 'react';
import './css/Home.css'
import { Helmet } from 'react-helmet';

class Home extends Component {
  state = {
    recentTransactions: [],
    totalProducts: 0,
    outOfStockProducts: 0,
    lowStockProducts: 0,
    databaseStatistics: {
      databaseSize: '',
      numberOfTables: 0,
      recentBackups: [],
    },
  };

  componentDidMount() {
    // Fetch data and update state as needed
    this.fetchRecentTransactions();
    this.fetchProductStatistics();
    this.fetchDatabaseStatistics();
  }

  // Fetch recent transactions from your API
  fetchRecentTransactions() {
    fetch('http://127.0.0.1:5000/api/recent-transactions')
      .then((response) => response.json())
      .then((data) => this.setState({ recentTransactions: data }));
  }

  // Fetch product statistics (total products, out-of-stock, low-stock) from your API
  fetchProductStatistics() {
    fetch('http://127.0.0.1:5000/api/product-statistics')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          totalProducts: data.totalProducts,
          outOfStockProducts: data.outOfStockProducts,
          lowStockProducts: data.lowStockProducts,
        })
      );
  }

  // Fetch database statistics from your API
  fetchDatabaseStatistics() {
    fetch('http://127.0.0.1:5000/api/database-statistics')
      .then((response) => response.json())
      .then((data) => this.setState({ databaseStatistics: data }));
  }

  render() {
    const {
      recentTransactions,
      totalProducts,
      outOfStockProducts,
      lowStockProducts,
      databaseStatistics,
    } = this.state;

    return (
      <div className='main'>
        <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"/>
        </Helmet>
        <h1>Welcome, Admin!</h1>

        {/* Container for Product Statistics, Database Statistics, and Recent Backups */}
        <div className="stats-container">
          <div className="leftbox">
            <h2>Product Statistics</h2>
            {/* Display product statistics data here */}
            <p>Total Products: {totalProducts}</p>
            <p>Out-of-Stock Products: {outOfStockProducts}</p>
            <p>Low-Stock Products: {lowStockProducts}</p>
          </div>

          <div className="middlebox">
              <h2>Database Statistics</h2>
              <p>Database Size: {databaseStatistics.databaseSize}</p>
              <p>Number of Tables: {databaseStatistics.numberOfTables}</p>
            <div/>
            
              
            </div>
            <div className="rightbox">
                  <h3>Recent Backups</h3>
                  <ul>
                    {databaseStatistics.recentBackups.map((backup, index) => (
                      <ul key={index}>{backup}</ul>
                    ))}
                  </ul>
              </div>
        </div>

        {/* Recent Transactions */}
        <div className="recent-transactions-container">
          <h2>Recent Transactions</h2>
          {/* Display recent transaction data here */}
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Total Amount</th>
                <th>Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.employee_name}</td>
                  <td>${transaction.total_amount.toFixed(2)}</td>
                  <td>{transaction.transaction_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}

export default Home;
