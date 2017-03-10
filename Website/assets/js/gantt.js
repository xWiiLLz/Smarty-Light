google.charts.load('current', {'packages':['gantt']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Task ID');
      data.addColumn('string', 'Task Name');
      data.addColumn('string', 'Cat&eacute;gorie');
      data.addColumn('date', 'Start Date');
      data.addColumn('date', 'End Date');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Percent Complete');
      data.addColumn('string', 'Dependencies');
	  

      data.addRows([
        ['Plan', 'Plan de projet','Planification',
         new Date(2017, 1, 16), new Date(2017, 1, 17), null, 100, null],
        ['Explication', 'Explication du projet', 'Planification',
         new Date(2017, 1, 16), new Date(2017, 1, 17), null, 100, null],
        ['Gantt', 'Diagramme de Gantt', 'Planification',
         new Date(2017, 1, 16), new Date(2017, 2, 4), null, 100, null],
        ['SchemaElectrique', 'Schéma électrique de l\'ampoule', 'Liste de pièces',
         new Date(2017, 1, 17), new Date(2017, 1, 24), null, 100, null],
        ['Inventaire', 'Liste sommaire des composantes', 'Liste de pièces',
         new Date(2017, 1, 17), new Date(2017, 1, 24), null, 100, null],
        ['Microcontroleur', 'Choix du microcontrôleur', 'Liste de pièces',
         new Date(2017, 1, 17), new Date(2017, 1, 24), null, 100, null],
        ['Ampoule', 'Choix de l\'ampoule', 'Liste de pièces',
         new Date(2017, 1, 17), new Date(2017, 2, 3), null, 100, null],
        ['LED', 'Choix des LEDs', 'Liste de pièces',
         new Date(2017, 1, 17), new Date(2017, 2, 3), null, 100, null],
        ['Transistor', 'Choix des transistors', 'Liste de pièces',
         new Date(2017, 1, 17), new Date(2017, 2, 7), null, 25, null]
        
      ]);
	  
      var options = {
		title: 'Diagramme de Gantt',
        height: 400,
        gantt: {
          trackHeight: 30
        }
      };

      var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

      chart.draw(data, options);
    }