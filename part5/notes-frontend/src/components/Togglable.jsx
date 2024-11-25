//part 5-b step 2 adding togglable for loginform and noteform components
// part 5-b step 9 import forwardRef hook to allow reference (ref) to re-render -
// - useImperativeHandle hook makes toggleVisibility function available out side the component
import { useState, forwardRef, useImperativeHandle } from 'react'

//const Togglable = (props) => {  -- step 10 modified to below forwardRef()
  const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideLoginForm = { display: visible ? 'none' : '' }
  const showLoginForm = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    }
    useImperativeHandle(refs, () => {
      return {
        toggleVisibility
      }
    })
  

  return (
    <div>
      <div style={hideLoginForm}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showLoginForm}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
})

export default Togglable