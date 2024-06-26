import { useState, Fragment } from 'react'
import { Check, ChevronLeft } from 'react-feather'
import { Row, Col, Card, CardBody, Label, Input, Button, FormGroup, FormFeedback } from 'reactstrap'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { Link } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'

import '@styles/react/libs/charts/apex-charts.scss'

const SuccessCreate = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title'>Success!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        Create User Success
      </span>
    </div>
  </Fragment>
)

const CreateUser = ({ history }) => {
  const [username, setUsername] = useState('sukimin')
  const [email, setEmail] = useState('sukimin@gmail.com')
  const [password, setPassword] = useState('Sub@2020')
  const [confirmPassword, setConfirmPassword] = useState('Sub@2020')
  const [role, setRole] = useState({value: 'Agent', label: 'Agent'})

  const roleOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Supervisor', label: 'Supervisor' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Agent', label: 'Agent' }
  ]

  const notifySuccessCreate = () => toast.success(<SuccessCreate />, { hideProgressBar: true })

  const createUser = () => {
    notifySuccessCreate()
    history.push('/user-management')
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
                  <h3>Create User</h3>
                </Col>
                <Col xs='12'>
                  <Label>Username</Label>
                  <Input
                    className='dataTable-filter mb-50'
                    type='text'
                    bsSize='sm'
                    id='username-input'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Col>
                <Col xs='12'>
                  <Label>Email</Label>
                  <Input
                    className='dataTable-filter mb-50'
                    type='email'
                    bsSize='sm'
                    id='email-input'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
                <Col xs='12'>
                  <Label>Password</Label>
                  {/* <Input
                    className='dataTable-filter mb-50'
                    type='password'
                    bsSize='sm'
                    id='username-input'
                    required
                    readOnly={readonlyInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  /> */}
                  <InputPasswordToggle
                    value={password}
                    id='password-input'
                    name='password'
                    className='input-group-merge'
                    onChange={e => setPassword(e.target.value)}
                  />
                </Col>
                <Col xs='12'>
                  <FormGroup>
                    <Label>Confirm Password</Label>
                    {/* <Input
                      className='dataTable-filter mb-50'
                      type='password'
                      bsSize='sm'
                      id='username-input'
                      required
                      readOnly={readonlyInput}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    /> */}
                    <InputPasswordToggle
                      value={confirmPassword}
                      id='confirm-password-input'
                      name='confirm-password'
                      className='input-group-merge'
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs='12'>
                  <Label>Role</Label>
                  <Select
                    className='react-select'
                    classNamePrefix='select'
                    // defaultValue={roleOptions[1]}
                    name='loading'
                    options={roleOptions}
                    isClearable={false}
                    required
                    value={role}
                    onChange={e => setRole(e)}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs='12' sm='6'>
            </Col>
          </Row>
          <Row>
            <Col xs='12' className='d-flex justify-content-end'>
              <Button color='primary' style={{marginLeft: '0.2rem', marginRight: '0.2rem'}} onClick={createUser}>Create</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default CreateUser
