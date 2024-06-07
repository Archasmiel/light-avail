document.addEventListener('DOMContentLoaded', () => {
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        const dateSelector = document.getElementById('dateSelector');
        const dates = Object.keys(data);
  
        dates.forEach(date => {
          const option = document.createElement('option');
          option.value = date;
          option.textContent = date;
          dateSelector.appendChild(option);
        });
  
        dateSelector.addEventListener('change', () => {
          const selectedDate = dateSelector.value;
          updateChart(data[selectedDate]);
        });
  
        // Initialize chart with the latest date
        if (dates.length > 0) {
          dateSelector.value = dates[dates.length - 1];
          updateChart(data[dates[dates.length - 1]]);
        }
      });
  });
  
  function updateChart(dayData) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = dayData.map((timestamp, index) => `Request ${index + 1}`);
    const chartData = dayData.map(timestamp => new Date(timestamp).getTime());
  
    if (window.myChart) {
      window.myChart.destroy();
    }
  
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Request Times',
          data: chartData,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
