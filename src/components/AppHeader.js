import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderBrand, CHeaderToggler } from '@coreui/react'
import MenuIcon from '@mui/icons-material/Menu'
import logo from '../assets/images/logo/logo8.png'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4" style={{ backgroundColor: '#012750' }}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <MenuIcon style={{ color: '#fff' }} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          <img src={logo} height={40} alt="logo" />
        </CHeaderBrand>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
