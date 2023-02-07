import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CButton,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import PropTypes from 'prop-types'

const WidgetsDropdown = ({
  paidPaymentsTotalValue = '0',
  paidPaymentsQuantity = '0',
  pendingPaymentsTotalValue = '0',
  pendingPaymentsQuantity = '0',
}) => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CButton style={{ margin: 10, borderColor: "green", backgroundColor: "green"}}>
        Total vendido: {paidPaymentsQuantity}
        </CButton>
      </CCol>
      <CCol sm={6} lg={3}>
        <CButton style={{ margin: 10, borderColor: "blue", backgroundColor: "blue"}}>
        Total vendido Pix: {paidPaymentsTotalValue}
        </CButton>
      </CCol>
      <CCol sm={6} lg={3}>
        <CButton style={{ margin: 10, borderColor: "#a1a100", backgroundColor: "#a1a100"}}>
        Pendente Pix: {pendingPaymentsQuantity}
        </CButton>
      </CCol>
      <CCol sm={6} lg={3}>
        <CButton style={{ margin: 10, borderColor: "red", backgroundColor: "red"}}>
        Total vendido dinheiro: {pendingPaymentsTotalValue}
        </CButton>
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  paidPaymentsTotalValue: PropTypes.string,
  paidPaymentsQuantity: PropTypes.string,
  pendingPaymentsTotalValue: PropTypes.string,
  pendingPaymentsQuantity: PropTypes.string,
}

export default WidgetsDropdown
