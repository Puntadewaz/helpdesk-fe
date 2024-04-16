import { useState, Fragment } from 'react'
import { Check, ChevronLeft } from 'react-feather'
import { Row, Col, Card, CardBody, Label, Input, Button, Toast, ToastBody, ToastHeader } from 'reactstrap'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { Link } from 'react-router-dom'

import '@styles/react/libs/charts/apex-charts.scss'

const SuccessToastRaise = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title'>Success!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        Raise Ticket Success
      </span>
    </div>
  </Fragment>
)

const SuccessToastUpdate = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title'>Success!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        Update Ticket Success
      </span>
    </div>
  </Fragment>
)

const SuccessToastResolved = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title'>Success!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        Resolve Ticket Success
      </span>
    </div>
  </Fragment>
)

const TicketDetails = ({ history }) => {
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const categoryOptions = [
    { value: 'Rating', label: 'Rating' },
    { value: 'Service', label: 'Service' },
    { value: 'System', label: 'System' },
    { value: 'Software', label: 'Software' },
    { value: 'Hardware', label: 'Hardware' }
  ]

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' }
  ]

  const notifySuccessRaise = () => toast.success(<SuccessToastRaise />, { hideProgressBar: true })
  const notifySuccessUpdate = () => toast.success(<SuccessToastUpdate />, { hideProgressBar: true })
  const notifySuccessResolved = () => toast.success(<SuccessToastResolved />, { hideProgressBar: true })

  const raiseTicket = () => {
    notifySuccessRaise()
    history.push('/ticket')
  }

  const updateTicket = () => {
    notifySuccessUpdate()
    history.push('/ticket')
  }

  const resolvedTicket = () => {
    notifySuccessResolved()
    history.push('/ticket')
  }

  return (
    <div id='dashboard-analytics'>
      <Card>
        <CardBody>
          <Row>
            <div style={{marginLeft: '1.5rem'}}>
              <Link to={{ pathname: '/ticket'}}>
                <Row>
                  <ChevronLeft />
                  <p>Back</p>
                </Row>
              </Link>
            </div>
          </Row>
          <Row className='match-height'>
            <Col xs='12' sm='6'>
              <Row>
                <Col xs='12'>
                  <h3>Ticket Details</h3>
                </Col>
                <Col xs='4'>
                  <p style={{marginBottom: '0px', marginTop: '1rem'}}>Ticket Number</p>
                  <p>65727908912</p>
                </Col>
                <Col xs='4'>
                  <p style={{marginBottom: '0px', marginTop: '1rem'}}>Name</p>
                  <p>Stella</p>
                </Col>
                <Col xs='4'>
                  <p style={{marginBottom: '0px', marginTop: '1rem'}}>Email</p>
                  <p>stella@example.com</p>
                </Col>
              </Row>
              <Row>
                <Col xs='4'>
                  <p style={{marginBottom: '0px', marginTop: '1rem'}}>Ticket Created</p>
                  <p>14-03-2024 19:07:09</p>
                </Col>
                <Col xs='4'>
                  <p style={{marginBottom: '0px', marginTop: '1rem'}}>Status</p>
                  <p>Open</p>
                </Col>
                <Col xs='4'>
                </Col>
              </Row>
              <Row style={{marginTop: '1rem'}}>
                <Col xs='6'>
                  <Label>Category</Label>
                  <Select
                    className='react-select'
                    classNamePrefix='select'
                    defaultValue={categoryOptions[3]}
                    name='loading'
                    options={categoryOptions}
                    // isLoading={true}
                    isClearable={false}
                  />
                </Col>
                <Col xs='6'>
                  <Label>Priority</Label>
                  <Select
                    className='react-select'
                    classNamePrefix='select'
                    defaultValue={priorityOptions[0]}
                    name='loading'
                    options={priorityOptions}
                    // isLoading={true}
                    isClearable={false}
                  />
                </Col>
              </Row>
              <Row style={{marginTop: '1rem'}}>
                <Col xs='12'>
                  <Label>Description</Label>
                  <Input type='textarea' readOnly name='text' id='exampleText' rows='3' placeholder='Textarea' />
                </Col>
              </Row>
              <Row style={{marginTop: '1rem'}}>
                <Col xs='6'>
                  <p style={{marginBottom: '0px', marginTop: '1rem'}}>Status</p>
                  <Row>
                    <Button color='primary' style={{marginLeft: '1rem'}}>File 1</Button>
                    <Button color='primary' style={{marginLeft: '1rem'}}>File 2</Button>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs='12' sm='6'>
              <Row>
                <Col xs='12'>
                  <h3>Ticket Response</h3>
                </Col>
                <Col xs='12'>
                  <Input type='textarea' readOnly name='text' id='exampleText' rows='3' placeholder='Textarea' />
                </Col>
                <Col xs='12'>
                  <Input style={{marginTop:'1rem'}} type='textarea' name='text' id='exampleText' rows='3' placeholder='Textarea' />
                </Col>
              </Row>
              <Row style={{marginTop: '1rem'}}>
                <Col xs='12'>
                  <Label>Summary</Label>
                  <Input type='textarea' name='text' id='exampleText' rows='3' placeholder='Textarea' />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs='12' className='d-flex justify-content-end'>
              <Button color='warning' style={{marginLeft: '0.2rem', marginRight: '0.2rem'}} onClick={raiseTicket}>Raise</Button>
              <Button color='info' outline style={{marginLeft: '0.2rem', marginRight: '0.2rem'}} onClick={updateTicket}>Update</Button>
              <Button color='success' style={{marginLeft: '0.2rem', marginRight: '0.2rem'}} onClick={resolvedTicket}>Resolved</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default TicketDetails
