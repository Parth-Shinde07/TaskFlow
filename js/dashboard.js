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

document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');
  const overlay = document.querySelector('.overlay');
  
  menuBtn.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('sidebar-open');
    overlay.classList.toggle('active');
  });
  
  overlay.addEventListener('click', function() {
    sidebar.classList.remove('active');
    mainContent.classList.remove('sidebar-open');
    overlay.classList.remove('active');
  });
});