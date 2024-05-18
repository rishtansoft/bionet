import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const MyChart = ({ weeklyData, monthlyData, yearlyData }) => {
    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Dushanba', 'Seyshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'],
                datasets: [{
                    label: 'Hafatalik davomat',
                    data: weeklyData,
                    borderColor: 'rgb(0, 23, 198)',
                    tension: 0.1,
                    boxWidth:"200px",
                    borderWidth:4
                
                }]
            },
            options: {
                scales: {
                  y: {
                    grid: {
                      display: true,
                      
                    }
                  },
                  x: {
                    grid: {
                      display: false, // Hide vertical grid lines
                    }
                  }
                }
              }
        });

        return () => {
            myChart.destroy(); // Clean up chart on component unmount
        };
    }, [weeklyData]);

    return (
        <div style={{
            width:'60%',
            height:'40%'
        }}>
            <canvas width={'200'} height={'100'} id="myChart"></canvas>
        </div>
    );
};

export default MyChart;
