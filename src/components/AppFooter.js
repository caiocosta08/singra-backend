import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        SINGRA <span> contato@singra.com.br</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
