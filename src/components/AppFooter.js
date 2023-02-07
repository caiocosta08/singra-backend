import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        Acutis Academy <span> contato@acutisacademy.com.br</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
