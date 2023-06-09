var months = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
var colors = ['rgba(255, 99, 132, 0.2)',
'rgba(255, 159, 64, 0.2)',
'rgba(255, 205, 86, 0.2)',
'rgba(75, 192, 192, 0.2)',
'rgba(54, 162, 235, 0.2)',
'rgba(153, 102, 255, 0.2)',
'rgba(201, 203, 207, 0.2)']
var borderColors = ['rgb(255, 99, 132)',
'rgb(255, 159, 64)',
'rgb(255, 205, 86)',
'rgb(75, 192, 192)',
'rgb(54, 162, 235)',
'rgb(153, 102, 255)',
'rgb(201, 203, 207)']

fetch('https://sistema-de-solicitudes-production.up.railway.app/admin/dataBar')
  .then(response => response.json())
  .then(data => {
  data.sort((monthA,monthB)=>{
    if(monthA.year==monthB.year){
      return monthA.month-monthB.month;
    }else{
      return monthA.year-monthB.year;
    }
  });
  let lastYear = data[data.length-1].year;
  let lastMonth = data[data.length-1].month;
  for(let countSpace=0;countSpace<8;countSpace++,lastMonth--){
    if(lastMonth==0){
      lastYear--;
      lastMonth=12;
    }
    if(data.filter(monthData =>{
      return monthData.year == lastYear && monthData.month == lastMonth;
    }).length==0)
    data.push({
      'year': lastYear,
      'month': lastMonth,
      'count': 0
    })
  }
  data.sort((monthA,monthB)=>{
    if(monthA.year==monthB.year){
      return monthA.month-monthB.month;
    }else{
      return monthA.year-monthB.year;
    }
  });


  const dataBar = {
    labels: data.map(monthData=>{return months[monthData.month-1]+' '+ monthData.year}),
    datasets: [
      {
        label: 'Solicitudes',
        data: data.map(monthData=>{return monthData.count}),
        backgroundColor: data.map(monthData=>{return colors[monthData.month%6]}),
        borderColor: data.map(monthData=>{return borderColors[monthData.month%6]}),
        borderWidth: 1
      }
    ]
  };
  
  
  const ctxBar = document.getElementById('barSolicitudes');
  
    new Chart(ctxBar, {
      type: 'bar',
      data: dataBar,
      options: {
        scales: {
          y: {
              ticks: {
                  precision: 0
              }
          }
      }
      }

    });

});


