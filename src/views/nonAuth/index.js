import React from 'react'
import { Route } from 'react-router-dom'

import main from './main'

export default () => (
  <Route>
    { main() }
  </Route>
)
