import React from 'react'
import AppBar from '@material-ui/core/AppBar'

const Footer = () => {
  return (
    <React.Fragment>
      <AppBar
        position="relative"
        style={{
          //position: 'absolute',
          width: '100%',
          // padding: 18,
          display: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
          height: 20,
          bottom: 60,
          left: 0,
          right: 0,
          background: "transparent"

        }}
        id="footer-text"
      >
        {`© ${new Date().getFullYear()} Copyright: yourcompany.com! All Rights Reserved`}
      </AppBar>
    </React.Fragment>
  )
}

export default Footer
