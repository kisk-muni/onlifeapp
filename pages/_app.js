import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import { ThemeProvider, Styled } from 'theme-ui'
import theme from '../theme'
//import { includePageLoading } from "../utils/pageLoading"
//import { getAuthCookieFromReq } from "../utils/auth/getAuthCookieFromReq"
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css"

// includePageLoading()

//export const isOnSecuredPath = path => !["/u"].includes(pathname)

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Styled.root>
          <Component {...pageProps} />
        </Styled.root>
      </ThemeProvider>
    )
  }
}

export default MyApp