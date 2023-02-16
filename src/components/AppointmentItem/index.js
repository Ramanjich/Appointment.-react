import './index.css'

const AppointmentItem = props => {
  const {eachList, onToggling} = props
  const {id, title, date, makeFavourite} = eachList
  const starUrl = makeFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarClick = () => {
    onToggling(id)
  }

  return (
    <li className="items">
      <div className="ti-star-con">
        <div>
          <p>{title}</p>
        </div>
        <div>
          <button
            type="button"
            className="star-btn"
            onClick={onStarClick}
            data-testid="star"
          >
            <img src={starUrl} alt="star" />
          </button>
        </div>
      </div>
      <p>{date}</p>
    </li>
  )
}
export default AppointmentItem
