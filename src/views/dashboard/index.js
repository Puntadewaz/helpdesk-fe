import { useContext, useState } from 'react'
import { Box, Clipboard, Clock, List, TrendingDown, TrendingUp } from 'react-feather'
// import { kFormatter } from '@utils'
import Avatar from '@components/avatar'
import AvatarGroup from '@components/avatar-group'
import jsonImg from '@src/assets/images/icons/json.png'
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media, Label, Table } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import { Bar, Line } from 'react-chartjs-2'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AnalyticsDashboard = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const { colors } = useContext(ThemeColors)

  const colourOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' }
  ]

  const regionOptions = [
    { value: 'banten', label: 'Banten' },
    { value: 'jawa barat', label: 'Jawa Barat' },
    { value: 'jawa tengah', label: 'Jawa Tengah' },
    { value: 'jawa timur', label: 'Jawa Timur' },
    { value: 'bali', label: 'Bali' }
  ]

  const agentOptions = [
    { value: '1', label: 'Alex' },
    { value: '2', label: 'Citra' },
    { value: '3', label: 'Sukimin' },
    { value: '4', label: 'Ratna' },
    { value: '5', label: 'Lisa' }
  ]

  const avatarGroupArr = [
      {
        title: 'Billy Hopkins',
        img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33
      },
      {
        title: 'Amy Carson',
        img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33
      },
      {
        title: 'Brandon Miles',
        img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33
      },
      {
        title: 'Daisy Weber',
        img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33
      },
      {
        title: 'Jenny Looper',
        img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
        placement: 'bottom',
        imgHeight: 33,
        imgWidth: 33
      }
    ],
    data = [
      {
        title: '12 Invoices have been paid',
        content: 'Invoices have been paid to the company.',
        meta: '',
        metaClassName: 'mr-1',
        customContent: (
          <Media>
            <img className='mr-1' src={jsonImg} alt='data.json' height='23' />
            <Media className='mb-0' body>
              data.json
            </Media>
          </Media>
        )
      },
      {
        title: 'Client Meeting',
        content: 'Project meeting with john @10:15am.',
        meta: '',
        metaClassName: 'mr-1',
        color: 'warning',
        customContent: (
          <Media className='align-items-center'>
            <Avatar img={ceo} />
            <Media className='ml-50' body>
              <h6 className='mb-0'>John Doe (Client)</h6>
              <span>CEO of Infibeam</span>
            </Media>
          </Media>
        )
      },
      {
        title: 'Create a new project for client',
        content: 'Add files to new design folder',
        color: 'info',
        meta: '',
        metaClassName: 'mr-1',
        customContent: <AvatarGroup data={avatarGroupArr} />
      },
      {
        title: 'Create a new project for client',
        content: 'Add files to new design folder',
        color: 'danger',
        meta: '',
        metaClassName: 'mr-1'
      }
    ]

    const optionsBar1 = {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: 'bottom'
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        display: false
      },
      tooltips: {
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        // shadowColor: tooltipShadow,
        backgroundColor: '#fff',
        titleFontColor: '#000',
        bodyFontColor: '#000'
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: true
              // color: gridLineColor,
              // zeroLineColor: gridLineColor
            },
            scaleLabel: {
              display: false
            },
            ticks: {
              // fontColor: labelColor
            }
          }
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              // color: gridLineColor,
              // zeroLineColor: gridLineColor
            },
            ticks: {
              stepSize: 100,
              min: 0,
              max: 400
              // fontColor: labelColor
            }
          }
        ]
      }
    },
    dataBar1 = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190, 100],
          backgroundColor: '#1B3D88',
          borderColor: 'transparent',
          barThickness: 15,
          borderRadius: '20px'
        }
      ]
    },
    dataBar2 = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          data: [
            Math.floor(Math.random() * 301), 
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301)
          ],
          backgroundColor: '#1B3D88',
          borderColor: 'transparent',
          borderRadius: 10
        },
        {
          data: [
            Math.floor(Math.random() * 301), 
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301),
            Math.floor(Math.random() * 301)
          ],
          backgroundColor: '#1B3D88',
          borderColor: 'transparent',
          borderRadius: 10
        }
      ]
    }

    const optionsLine = {
      responsive: true,
      maintainAspectRatio: false,
      backgroundColor: false,
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 25,
          boxWidth: 10
        }
      },
      hover: {
        mode: 'label'
      },
      tooltips: {
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        // shadowColor: tooltipShadow,
        backgroundColor: '#fff',
        titleFontColor: '#000',
        bodyFontColor: '#000'
      },
      layout: {
        padding: {
          top: -15,
          bottom: -25,
          left: -15
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            },
            gridLines: {
              display: true
              // color: gridLineColor,
              // zeroLineColor: gridLineColor
            },
            ticks: {
              // fontColor: labelColor
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            },
            ticks: {
              stepSize: 100,
              min: 0,
              max: 400
              // fontColor: labelColor
            },
            gridLines: {
              display: true
              // color: gridLineColor,
              // zeroLineColor: gridLineColor
            }
          }
        ]
      },
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          usePointStyle: true,
          padding: 25,
          boxWidth: 9
        }
      }
    },
    dataLine = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          data: [80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255],
          label: 'Lead Times (hr)',
          borderColor: '#1B3D88',
          lineTension: 0.5,
          pointStyle: 'circle',
          backgroundColor: '#1B3D88',
          fill: false,
          pointRadius: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 5,
          pointBorderColor: '#1B3D88',
          pointHoverBorderColor: '#1B3D88',
          // pointHoverBackgroundColor: lineChartDanger,
          pointShadowOffsetX: 1,
          pointShadowOffsetY: 1,
          pointShadowBlur: 5
          // pointShadowColor: tooltipShadow
        }
      ]
    }

  //** To add spacing between legends and chart
  // const plugins = [
  //   {
  //     beforeInit(chart) {
  //       chart.legend.afterFit = function () {
  //         this.height += 20
  //       }
  //     }
  //   }
  // ]

  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='6' sm='12'>
          <Row>
            <Col lg='6' sm='12'>
              <Label for='start-date'>Tanggal Mulai</Label>
              <Flatpickr className='form-control' style={{ backgroundColor: '#fff' }} value={startDate} onChange={date => setStartDate(date)} id='start-date' />
            </Col>
            <Col lg='1' sm='12'>
              <div style={{ alignItems: 'center', alignContent: 'center', textAlign: 'center' }}>
                <p style={{ fontSize: '30px', marginTop: '2rem' }}><b>-</b></p>
              </div>
            </Col>
            <Col lg='5' sm='12'>
              <Label for='end-date'>Tanggal Berakhir</Label>
              <Flatpickr className='form-control' style={{ backgroundColor: '#fff' }} value={endDate} onChange={date => setEndDate(date)} id='end-date' />
            </Col>
          </Row>
        </Col>
        <Col lg='3' sm='12'>
          <Label>Region</Label>
          <Select
            className='react-select'
            classNamePrefix='select'
            defaultValue={regionOptions[3]}
            name='loading'
            options={regionOptions}
            // isLoading={true}
            isClearable={false}
          />
        </Col>
        <Col lg='3' sm='12'>
          <Label>Agent</Label>
          <Select
            className='react-select'
            classNamePrefix='select'
            defaultValue={agentOptions[2]}
            name='loading'
            options={agentOptions}
            // isLoading={true}
            isClearable={false}
          />
        </Col>
      </Row>
      <Row className='match-height mt-2'>
        <Col lg='7' xs='12'>
          <Row>
            <Col lg='4' xs='12' style={{ paddingRight: '0.5rem' }} className='match-height'>
              <Card style={{ minHeight: '136px' }}>
                <CardBody>
                  <Row>
                    <Col lg='12' xs='12'>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: 'rgb(27, 61, 136)' }}>Total Ticket</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' xs='12'>
                      <Row style={{paddingLeft: '1rem'}}>
                        <p style={{ fontSize: '12px', color: 'rgb(68, 68, 68)', fontWeight: 500, marginBottom: '0.2rem'}}>-42.22%</p>
                        <TrendingUp size={18} className='ml-1' color='#D0242A' />
                      </Row>
                      <Row>
                        <Col xs='12'>
                          <p style={{ fontSize: '8px', color: 'rgb(68, 68, 68)', fontWeight: 500}}>from last period</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg='6' xs='12'>
                      <p style={{ fontSize: '24px', color: 'rgb(68, 68, 68)', fontWeight: 600, textAlign: 'end' }}>1493</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg='4' xs='12' style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }} className='match-height'>
              <Card style={{ minHeight: '136px' }}>
                <CardBody>
                  <Row>
                    <Col lg='12' xs='12'>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: 'rgb(27, 61, 136)' }}>Average Lead Time</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' xs='12'>
                      <Row style={{paddingLeft: '1rem'}}>
                        <p style={{ fontSize: '12px', color: 'rgb(68, 68, 68)', fontWeight: 500, marginBottom: '0.2rem'}}>-42.22%</p>
                        <TrendingDown size={18} className='ml-1' color='#23A32F' />
                      </Row>
                      <Row>
                        <Col xs='12'>
                          <p style={{ fontSize: '8px', color: 'rgb(68, 68, 68)', fontWeight: 500}}>from last period</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg='6' xs='12'>
                      <p style={{ fontSize: '24px', color: 'rgb(68, 68, 68)', fontWeight: 600, textAlign: 'end' }}>37 hr</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg='4' xs='12' style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }} className='match-height'>
              <Card style={{ minHeight: '136px' }}>
                <CardBody>
                  <Row>
                    <Col lg='12' xs='12'>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: 'rgb(27, 61, 136)' }}>Severity Level</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' xs='12'>
                      <p style={{ fontSize: '20px', color: 'rgb(68, 68, 68)', fontWeight: 600}}>62.43%</p>
                    </Col>
                    <Col lg='6' xs='12'>
                      <p style={{ fontSize: '20px', color: 'rgb(68, 68, 68)', fontWeight: 600, textAlign: 'end' }}>LOW</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg='4' xs='12' style={{ paddingRight: '0.5rem' }} className='match-height'>
              <Card style={{ minHeight: '458px' }}>
                <CardBody>
                  <Row>
                    <Col lg='12' xs='12'>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: '#B4504BA6' }}>IN PROGRESS</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='4' xs='12'>
                      <Avatar color='light-danger' icon={<Box size={24} />} className='mr-2' />
                    </Col>
                    <Col lg='8' xs='12'>
                      <p style={{ fontSize: '12px', color: '#444444', fontWeight: 500, textAlign: 'end' }}>16.67%</p>
                      <p style={{ fontSize: '24px', color: '#9F2A25', fontWeight: 600, textAlign: 'end' }}>1493</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <Card style={{ backgroundColor: '#F3F7FB' }}>
                        <Row>
                          <Col lg='12' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '1.5rem' }}>
                            <p style={{ fontSize: '10px', color: '#262626' }}>Overtime</p>
                          </Col>
                          <Col lg='12' xs='12' style={{ paddingRight: '1.5rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                            <p style={{ fontSize: '16px', color: '#262626', fontWeight: 600 }}>73</p>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <Card style={{ backgroundColor: '#F3F7FB' }}>
                        <Row>
                          <Col lg='12' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '1.5rem' }}>
                            <p style={{ fontSize: '10px', color: '#262626' }}>On Time</p>
                          </Col>
                          <Col lg='12' xs='12' style={{ paddingRight: '1.5rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                            <p style={{ fontSize: '16px', color: '#262626', fontWeight: 600 }}>111</p>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                  <Row style={{borderTop: '0.5px solid #E5E5E599'}}>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <p className='mt-1' style={{ color: '#B4504BA6', fontSize: '12px', fontWeight: 600 }}>OPEN TO IN PROGRESS</p>
                    </Col>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                      <p className='mt-1' style={{ color: '#444444', fontSize: '12px', fontWeight: 500 }}>16 hours</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg='4' xs='12' style={{ paddingRight: '0.5rem' }} className='match-height'>
              <Card style={{ minHeight: '458px' }}>
                <CardBody>
                  <Row>
                    <Col lg='12' xs='12'>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: '#DF8A3AA6' }}>PENDING</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='4' xs='12'>
                      <Avatar color='light-warning' icon={<Clock size={24} />} className='mr-2' />
                    </Col>
                    <Col lg='8' xs='12'>
                      <p style={{ fontSize: '12px', color: '#444444', fontWeight: 500, textAlign: 'end' }}>16.67%</p>
                      <p style={{ fontSize: '24px', color: '#DF8A3A', fontWeight: 600, textAlign: 'end' }}>1493</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <Card style={{ backgroundColor: '#F3F7FB' }}>
                        <Row>
                          <Col lg='12' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '1.5rem' }}>
                            <p style={{ fontSize: '10px', color: '#262626' }}>Overtime</p>
                          </Col>
                          <Col lg='12' xs='12' style={{ paddingRight: '1.5rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                            <p style={{ fontSize: '16px', color: '#262626', fontWeight: 600 }}>73</p>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <Card style={{ backgroundColor: '#F3F7FB' }}>
                        <Row>
                          <Col lg='12' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '1.5rem' }}>
                            <p style={{ fontSize: '10px', color: '#262626' }}>On Time</p>
                          </Col>
                          <Col lg='12' xs='12' style={{ paddingRight: '1.5rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                            <p style={{ fontSize: '16px', color: '#262626', fontWeight: 600 }}>111</p>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                  <Row style={{borderTop: '0.5px solid #E5E5E599'}}>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <p className='mt-1' style={{ color: '#DF8A3AA6', fontSize: '12px', fontWeight: 600 }}>IN PROGRESS TO PENDING</p>
                    </Col>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                      <p className='mt-1' style={{ color: '#444444', fontSize: '12px', fontWeight: 500 }}>16 hours</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg='4' xs='12' style={{ paddingRight: '0.5rem' }} className='match-height'>
              <Card style={{ minHeight: '458px' }}>
                <CardBody>
                  <Row>
                    <Col lg='12' xs='12'>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: '#678576A6' }}>RESOLVED</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' xs='12'>
                      <Avatar color='light-success' icon={<Clipboard size={24} />} className='mr-2' />
                    </Col>
                    <Col lg='6' xs='12'>
                      <p style={{ fontSize: '12px', color: '#444444', fontWeight: 500, textAlign: 'end' }}>16.67%</p>
                      <p style={{ fontSize: '24px', color: '#678576', fontWeight: 600, textAlign: 'end' }}>1493</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <Card style={{ backgroundColor: '#F3F7FB' }}>
                        <Row>
                          <Col lg='12' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '1.5rem' }}>
                            <p style={{ fontSize: '10px', color: '#262626' }}>Overtime</p>
                          </Col>
                          <Col lg='12' xs='12' style={{ paddingRight: '1.5rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                            <p style={{ fontSize: '16px', color: '#262626', fontWeight: 600 }}>73</p>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <Card style={{ backgroundColor: '#F3F7FB' }}>
                        <Row>
                          <Col lg='12' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '1.5rem' }}>
                            <p style={{ fontSize: '10px', color: '#262626' }}>On Time</p>
                          </Col>
                          <Col lg='12' xs='12' style={{ paddingRight: '1.5rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                            <p style={{ fontSize: '16px', color: '#262626', fontWeight: 600 }}>111</p>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                  <Row style={{borderTop: '0.5px solid #E5E5E599'}}>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <p className='mt-1' style={{ color: '#678576CC', fontSize: '12px', fontWeight: 600 }}>OPEN TO RESOLVED</p>
                    </Col>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                      <p className='mt-1' style={{ color: '#444444', fontSize: '12px', fontWeight: 500 }}>16 hours</p>
                    </Col>
                  </Row>
                  <Row style={{borderTop: '0.5px solid #E5E5E599'}}>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <p className='mt-1' style={{ color: '#678576CC', fontSize: '12px', fontWeight: 600 }}>IN PROGRESS TO RESOLVED</p>
                    </Col>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                      <p className='mt-1' style={{ color: '#444444', fontSize: '12px', fontWeight: 500 }}>16 hours</p>
                    </Col>
                  </Row>
                  <Row style={{borderTop: '0.5px solid #E5E5E599'}}>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem' }}>
                      <p className='mt-1' style={{ color: '#678576CC', fontSize: '12px', fontWeight: 600 }}>PENDING TO RESOLVED</p>
                    </Col>
                    <Col lg='6' xs='12' style={{ paddingRight: '0.2rem', paddingLeft: '0.2rem', textAlign: 'end' }}>
                      <p className='mt-1' style={{ color: '#444444', fontSize: '12px', fontWeight: 500 }}>16 hours</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg='5' xs='12' style={{ paddingLeft: '0.5rem' }}>
          <Card>
            <CardBody>
              <Row>
                <Col xs='12'>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: 'rgb(27, 61, 136)' }}>Top 10 Subject</p>
                </Col>
                <Col xs='12' style={{paddingLeft: '0.2rem', paddingRight: '0.2rem'}}>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '12px', padding: '1rem' }}>Subject</th>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '12px', padding: '1rem' }}>Total</th>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '12px', padding: '1rem' }}>Percent</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontSize: '14px', padding: '1rem' }}>
                          Pendaftaran / Booking Servis Bengkel & Kunjung
                        </td>
                        <td style={{ fontSize: '14px', textAlign: 'center', padding: '1rem' }}>428</td>
                        <td style={{ fontSize: '14px', textAlign: 'center', padding: '1rem' }}>29.30%</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='6' xs='12'>
          <Card className='card-user-timeline'>
            <CardHeader>
              <div className='d-flex align-items-center'>
                <CardTitle tag='h4' style={{color: '#1B3D88', fontWeight: 600}}>Total Ticket Apps</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
              <Bar data={dataBar1} options={optionsBar1} height={400} />
            </CardBody>
          </Card>
        </Col>
        <Col lg='6' xs='12'>
          <Card className='card-user-timeline'>
            <CardHeader>
              <div className='d-flex align-items-center'>
                <CardTitle tag='h4' style={{color: '#1B3D88', fontWeight: 600}}>Total Ticket Web</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
              <Bar data={dataBar1} options={optionsBar1} height={400} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xs='12'>
          <Card className='card-user-timeline'>
            <CardHeader>
              <div className='d-flex align-items-center'>
                <CardTitle tag='h4' style={{color: '#1B3D88', fontWeight: 600}}>Total Ticket Apps and Web</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
              <Bar data={dataBar1} options={optionsBar1} height={400} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xs='12'>
          <Card className='card-user-timeline'>
            <CardHeader>
              <div className='d-flex align-items-center'>
                <CardTitle tag='h4' style={{color: '#1B3D88', fontWeight: 600}}>Total Ticket Each Month</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
              <Bar data={dataBar2} options={optionsBar1} height={400} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='6' xs='12'>
          <Card className='card-user-timeline'>
            <CardHeader>
              <div className='d-flex align-items-center'>
                <CardTitle tag='h4' style={{color: '#1B3D88', fontWeight: 600}}>Category Status</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs='12'>
                  <Bar data={dataBar1} options={optionsBar1} height={400} />
                </Col>
                <Col xs='12'>
                  <Table responsive className='mt-2'>
                    <thead>
                      <tr>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '10px', padding: '0.5rem' }}>Category</th>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '10px', padding: '0.5rem' }}>Total</th>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '10px', padding: '0.5rem' }}>Low</th>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '10px', padding: '0.5rem' }}>Lead Time (hr)</th>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '10px', padding: '0.5rem' }}>Medium</th>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '10px', padding: '0.5rem' }}>Lead Time (hr)</th>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '10px', padding: '0.5rem' }}>Critical</th>
                        <th style={{backgroundColor: '#fff', borderTop: 'none', fontSize: '10px', padding: '0.5rem' }}>Lead Time (hr)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontSize: '10px', padding: '0.5rem' }}>Bugs</td>
                        <td style={{ fontSize: '10px', textAlign: 'center', padding: '0.5rem' }}>64</td>
                        <td style={{ fontSize: '10px', textAlign: 'center', padding: '0.5rem' }}>61</td>
                        <td style={{ fontSize: '10px', textAlign: 'center', padding: '0.5rem' }}>1</td>
                        <td style={{ fontSize: '10px', textAlign: 'center', padding: '0.5rem' }}>5</td>
                        <td style={{ fontSize: '10px', textAlign: 'center', padding: '0.5rem' }}>57.2</td>
                        <td style={{ fontSize: '10px', textAlign: 'center', padding: '0.5rem' }}>2</td>
                        <td style={{ fontSize: '10px', textAlign: 'center', padding: '0.5rem' }}>3.47</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg='6' xs='12'>
          <Card className='card-user-timeline'>
            <CardHeader>
              <div className='d-flex align-items-center'>
                <CardTitle tag='h4' style={{color: '#1B3D88', fontWeight: 600}}>Trend Average Lead Time (hr)</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
              <Line data={dataLine} options={optionsLine} height={400} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AnalyticsDashboard
