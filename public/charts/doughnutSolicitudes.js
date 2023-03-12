fetch('http://localhost:3000/admin/dataDoughtnut')
  .then(response => response.json())
  .then(data => {
  let myLabels = [];
  let myData = [];

  data.forEach(element => {
    myLabels.push(element._id);
    myData.push(element.countSolicitudes);
  });

  let labelsIdeal = ['No revisada', 'En proceso', 'Incorrecta', 'Incompleta', 'Revisada'];
  let contadorEspacios = 0;
  labelsIdeal.forEach(label=>{
    if(!myLabels.includes(label)){
      myLabels.push(label);
      contadorEspacios++;
    }
  });
  for (let i = 0; i < contadorEspacios; i++) {
    myData.push(0);
  }

  const dataDoughnut = {
    labels: myLabels,
    datasets: [
      {
        label: 'Solicitudes',
        data: myData,
        // backgroundColor: Object.values(Utils.CHART_COLORS),
      }
    ]
  };
  const ctxDoughnut = document.getElementById('doughnutSolicitudes');
  
    new Chart(ctxDoughnut, {
  
      type: 'doughnut',
    data: dataDoughnut,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Estado de solicitudes'
        }
      }
    }
  
  });
});


