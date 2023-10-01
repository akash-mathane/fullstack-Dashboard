import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

function Piechartsupplier() {
    const [supplierData, setSupplierData] = useState([]);

    useEffect(() => {
        // Fetch data from the Flask API endpoint
        fetch('http://127.0.0.1:5000/api/supplier-distribution')
            .then((response) => response.json())
            .then((data) => setSupplierData(data));
    }, []);

    const chartData = {
        labels: supplierData.map((supplier) => supplier.company_name),
        datasets: [
            {
                data: supplierData.map((supplier) => supplier.count),
                backgroundColor: [
                    '#FF5733',
                    '#FFC300',
                    '#36A2EB',
                    // Add more colors as needed
                ],
            },
        ],
    };

    return (
        <div>
            <h2>Supplier Distribution</h2>
            <Pie data={chartData} />
        </div>
    );
}

export default Piechartsupplier;
