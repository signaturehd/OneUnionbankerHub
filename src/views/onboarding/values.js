import React from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'

const FormValues = ({ values }) =>

  <div>
    <code>
      <pre>
        {values ? JSON.stringify(values, 0, 2) : String(values)}
      </pre>
    </code>
  </div>

export default connect(state => ({
  values: getFormValues('form')(state)

}))(FormValues)
