/* eslint-disable no-unused-vars */
const fx = a => b => [a, b]

export const PopState = fx((dispatch, props) => {
  const handleLocationChange = ev => {
    dispatch(props.action, window.location.pathname)
  }
  addEventListener('pushstate', handleLocationChange)
  addEventListener('popstate', handleLocationChange)
  return () => {
    removeEventListener('pushstate', handleLocationChange)
    removeEventListener('popstate', handleLocationChange)
  }
})
