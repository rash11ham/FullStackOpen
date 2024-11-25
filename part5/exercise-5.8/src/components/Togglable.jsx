//exercise 5.5 step 2
//exercise 5.6 step 3 import forwardRef and useImperativeHandle
import { useState, forwardRef, useImperativeHandle } from 'react'

//exercise 5.6 step 4 add the forwardRef() method this will wrap the component to forwardRef call back function -
// - this way the component can access the ref that assigned to it.
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
    //exercise 5.6 step 5 this method will make the togleVisibility available outside of the component
  useImperativeHandle(refs, () => {
      return {
          toggleVisibility
      }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable