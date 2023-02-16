import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {titleInput: '', dateInput: '', appointmentList: []}

  onTitleChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateChange = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newList = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      makeFavourite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newList],
      titleInput: '',
      dateInput: '',
    }))
  }

  onToggling = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, makeFavourite: !eachItem.makeFavourite}
        }
        return eachItem
      }),
    }))
  }

  onFilterFavourite = () => {
    const {appointmentList} = this.state
    const updatedList = appointmentList.filter(
      eachOne => eachOne.makeFavourite === true,
    )
    this.setState({appointmentList: updatedList})
  }

  render() {
    const {appointmentList, titleInput, dateInput} = this.state
    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="mini-container">
            <div className="form-container">
              <h1>Add Appointment</h1>
              <form onSubmit={this.onAddAppointment}>
                <div className="title-container">
                  <label htmlFor="Title">TITLE</label>
                  <input
                    id="Title"
                    type="text"
                    className="title-input-ele"
                    placeholder="TITLE"
                    onChange={this.onTitleChange}
                    value={titleInput}
                  />
                </div>
                <div className="date-container">
                  <label htmlFor="Date">DATE</label>
                  <input
                    id="Date"
                    type="date"
                    className="date-input-ele"
                    onChange={this.onDateChange}
                    value={dateInput}
                  />
                </div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image-style"
              />
            </div>
          </div>
          <div className="container-1">
            <div>
              <h1 className="heading-2">Appointments</h1>
            </div>
            <div>
              <button
                type="button"
                className="filter-btn"
                onClick={this.onFilterFavourite}
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="list-appointments">
            {appointmentList.map(eachList => (
              <AppointmentItem
                eachList={eachList}
                key={eachList.id}
                onToggling={this.onToggling}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
