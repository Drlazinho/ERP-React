import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';

export default function UserAccessChart({ data }) {
    
    const [chart, setChart] = useState({
        series: [{
            name: '',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }],
        noData: {
            text: 'Sem login registrada no mês',
            align: 'center',
            verticalAlign: 'middle',
            style: {
              color: '#ff0000',
              fontSize: '20px',
              fontWeight: 'bold',
            }
          },
        options: {
            chart: {
                type: 'bar',
                height: 20
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: '10%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
        },
    })

    const updateDataChart = () => {
        const users = [];
        const logins = [];
    
        for (const obj of data) {
          users.push(obj.nome);
          logins.push(obj.quantidadeAcesso);
        }

        setChart({
            series: [{
                name: '',
                data: logins
            }],
            options: {
                title: {
                    text: 'Qtd de Logins por Usuário',          
                    align: 'left',
                    style: {
                      fontSize: '14px',
                    },
                  },
                chart: {
                    type: 'bar',
                    height: 20
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        columnWidth: '10%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                      return val ;
                    },
                    textAnchor: 'middle',
                    distributed: false,
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                      fontSize: '11px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: '400',
                      colors: ['#000', '#999'],
                    },
                    background: {
                      enabled: true,
                      foreColor: '#fff',
                      padding: 2,
                      borderRadius: 2,
                      borderWidth: 1,
                      borderColor: '#fff',
                      opacity: 0.9,
                      dropShadow: {
                        enabled: false,
                        top: 1,
                        left: 1,
                        blur: 1,
                        color: '#000',
                        opacity: 0.25,
                      },
                    },
                    dropShadow: {
                      enabled: false,
                      top: 1,
                      left: 1,
                      blur: 1,
                      color: '#000',
                      opacity: 0.45,
                    },
                  },
          
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: users,
                },
                yaxis: {
                    title: {
                        text: 'Usuarios'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return `${val} login `
                        }
                    }
                }
            },
        })
    }

    useEffect(()=> {
        updateDataChart()
    }, [data])

    return (
        <Chart
            options={chart.options}
            series={chart.series}
            type="bar"
            height={40 * data.length}
        />
    )
}
