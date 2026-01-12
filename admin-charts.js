// Admin Dashboard Charts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts after dashboard loads
    setTimeout(() => {
        initCharts();
    }, 500);
});

function initCharts() {
    // Enrollment Chart
    const enrollmentCtx = document.getElementById('enrollmentChart').getContext('2d');
    const enrollmentChart = new Chart(enrollmentCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Student Enrollment',
                data: [120, 150, 180, 210, 240, 280, 320],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                        color: 'rgba(226, 232, 240, 0.5)'
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            family: 'Poppins'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            family: 'Poppins'
                        }
                    }
                }
            }
        }
    });
    
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    const attendanceChart = new Chart(attendanceCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Present',
                data: [85, 92, 78, 88, 90, 75],
                backgroundColor: '#10b981',
                borderRadius: 8,
                borderSkipped: false
            }, {
                label: 'Absent',
                data: [15, 8, 22, 12, 10, 25],
                backgroundColor: '#ef4444',
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#475569',
                        font: {
                            family: 'Poppins',
                            size: 13
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        drawBorder: false,
                        color: 'rgba(226, 232, 240, 0.5)'
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            family: 'Poppins'
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#64748b',
                        font: {
                            family: 'Poppins'
                        }
                    }
                }
            }
        }
    });
    
    // Update charts on filter change
    const chartSelects = document.querySelectorAll('.chart-select');
    chartSelects.forEach(select => {
        select.addEventListener('change', function() {
            const chartTitle = this.closest('.chart-header').querySelector('h3').textContent;
            
            // Show loading on chart
            const canvas = this.closest('.chart-container').querySelector('canvas');
            const ctx = canvas.getContext('2d');
            
            // Clear and show loading
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#64748b';
            ctx.font = '14px Poppins';
            ctx.textAlign = 'center';
            ctx.fillText('Updating data...', canvas.width/2, canvas.height/2);
            
            // Simulate data update
            setTimeout(() => {
                if (chartTitle === 'Student Enrollment') {
                    updateEnrollmentChart(this.value);
                } else {
                    updateAttendanceChart(this.value);
                }
            }, 1000);
        });
    });
    
    function updateEnChart(chartTitle) {
        const chartSelects = document.querySelectorAll('.chart-select');
    chartSelects.forEach(select => {
        select.addEventListener('change', function() {
            const chartTitle = this.closest('.chart-header').querySelector('h3').textContent;
            
            // Show loading on chart
            const canvas = this.closest('.chart-container').querySelector('canvas');
            const ctx = canvas.getContext('2d');
            
            // Clear and show loading
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#64748b';
            ctx.font = '14px Poppins';
            ctx.textAlign = 'center';
            ctx.fillText('Updating data...', canvas.width/2, canvas.height/2);
            
            // Simulate data update
            setTimeout(() => {
                if (chartTitle === 'Student Enrollment') {
                    updateEnrollmentChart(this.value);
                } else {
                    updateAttendanceChart(this.value);
                }
            }, 1000);
        });
    });
    
    function updateEnrollmentChart(filter) {
        // This would normally fetch new data from an API
        // For demo, we'll just reload the chart
        enrollmentChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        enrollmentChart.data.datasets[0].data = [120, 150, 180, 210, 240, 280, 320];
        enrollmentChart.update();
    }
    
    function updateAttendanceChart(filter) {
        // This would normally fetch new data from an API
        // For demo, we'll just reload the chart
        attendanceChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        attendanceChart.data.datasets[0].data = [85, 92, 78, 88, 90, 75];
        attendanceChart.data.datasets[1].data = [15, 8, 22, 12, 10, 25];
        attendanceChart.update();
    }}}