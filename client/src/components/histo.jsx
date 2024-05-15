import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './histo';

const Histogramme = () => {
  const [users, setUsers] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [minPrestation, setMinPrestation] = useState(Number.MAX_VALUE);
  const [maxPrestation, setMaxPrestation] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get("http://localhost//PR2/server/user/save")
      .then(function(response) {
        setUsers(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (users.length > 0) {
      const { sum, max, min } = users.reduce((acc, user) => {
        const product = user.taux_journalier * user.nbr_jours;
        const minPres = Math.min(acc.min, product);
        const maxPres = Math.max(acc.max, product);
        return {
          sum: acc.sum + product,
          min: minPres,
          max: maxPres,
        };
      }, { sum: 0, max: 0, min: Number.MAX_VALUE });

      setTotalSum(sum);
      setMinPrestation(min);
      setMaxPrestation(max);

    // Destruction du graphique existant s'il y en a un
    const existingChart = Chart.getChart('myChart');
    if (existingChart) {
      existingChart.destroy();
    }

      // Création de l'histogramme une fois les données mises à jour
      createHistogram(sum, min, max);
    }
  }, [users]);

  const createHistogram = (sum, min, max) => {
    const ctx = document.getElementById('myChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Prestation Total', 'Prestation Minimal', 'Prestation Maximal'],
          datasets: [{
            label: 'Valeurs',
            data: [sum, min, max],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default Histogramme;
