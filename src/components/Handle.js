import PropTypes from 'prop-types'
import React from 'react'

const Handle = ({
  error,
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled,
  getHandleProps,
  errorColor,
  validColor
}) => {
  const leftPosition = `${percent}%`

  const getHandleStyle = () => {
    if(disabled) return undefined;
    if(error) return { backgroundColor: errorColor };
    return { backgroundColor: validColor };
  }

  return (
    <>
      <div className='react_time_range__handle_wrapper' style={{ left: leftPosition }} {...getHandleProps(id)} />
      <div
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={`react_time_range__handle_container${disabled ? '__disabled' : ''}`}
        style={{ left: leftPosition }}
      >
        <div className={`react_time_range__handle_marker${error ? '__error' : ''}`} style={getHandleStyle()} />
      </div>
    </>
  )
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  errorColor: PropTypes.string,
  validColor: PropTypes.string,
}

Handle.defaultProps = { 
  disabled: false,
  errorColor: 'rgb(214, 0, 11)',
  validColor: 'rgb(98, 203, 102)'
}

export default Handle
