fetch('https://sistema-de-solicitudes-production.up.railway.app/admin/dataRadial')
  .then(response => response.json())
  .then(data => {
  let myLabels = [];
  let myData = [];

  data.forEach(element => {
    myLabels.push(element._id);
    myData.push(element.countDepartments);
  });

  let labelsIdeal = ['Computacion', 'Fisica', 'Matematica', 'Ingles', 'C. sociales'];
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



  const dataRadar = {
    labels: myLabels,
    datasets: [
      {
        label: 'Solicitudes',
        data: myData,
        // backgroundColor: Object.values(Utils.CHART_COLORS),
      }
    ]
  };
  
  
  const ctxRadar = document.getElementById('radarDepartamentos');
  
    new Chart(ctxRadar, {
      type: 'radar',
      data: dataRadar,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Solicitudes por departamento'
          }
        }
      }
  });

});


