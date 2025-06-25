const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Completed', 'In Progress', 'Pending'],
        datasets: [{
            data: [15, 5, 4],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top', // or 'bottom', 'left', 'right'
            },
            title: {
                display: true,
                text: 'Task Status'
            }
        }
    }
});