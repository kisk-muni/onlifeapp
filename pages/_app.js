import React from 'react'
import App from 'next/app'
import sentry from '../utils/sentry'
import { ThemeProvider, Styled } from 'theme-ui'
import theme from '../theme'
//import { includePageLoading } from "../utils/pageLoading"
//import { getAuthCookieFromReq } from "../utils/auth/getAuthCookieFromReq"
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css"

// includePageLoading()

//export const isOnSecuredPath = path => !["/u"].includes(pathname)

const { Sentry, captureException } = sentry()

export default class MyApp extends App {
  constructor() {
    super(...arguments)
    this.state = {
      hasError: false,
      errorEventId: undefined,
    }
  }
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

  static async getInitialProps({ Component, ctx }) {
    try {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }

      return { pageProps }
    } catch (error) {
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      console.log(error)
      const errorEventId = captureException(error, ctx)
      return {
        hasError: true,
        errorEventId,
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    // If there was an error generated within getInitialProps, and we haven't
    // yet seen an error, we add it to this.state here
    return {
      hasError: props.hasError || state.hasError || false,
      errorEventId: props.errorEventId || state.errorEventId || undefined,
    }
  }

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    const errorEventId = captureException(error, { errorInfo })

    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
    this.setState({ errorEventId })
  }

  render() {
    const { Component, pageProps } = this.props
    return this.state.hasError ? (
      <section>
        <h1>There was an error!</h1>
        <p>
          <a
            href="#"
            onClick={() =>
              Sentry.showReportDialog({ eventId: this.state.errorEventId })
            }
          >
            📣 Report this error
          </a>
        </p>
        <p>
          <a
            href="#"
            onClick={() => {
              window.location.reload(true)
            }}
          >
            Or, try reloading the page
          </a>
        </p>
      </section>
    ) : (
      <ThemeProvider theme={theme}>
        <Styled.root>
          <Component {...pageProps} />
          <style jsx global>{`
            .toaster-notification {
              margin-top: -10px;
            } 
            .bp3-toast-container.bp3-toast-container-top.toaster-notification .bp3-toast {
              box-shadow: 0 8px 30px rgba(0,0,0,0.12);
            }
            .bp3-popover {
              box-shadow: 0 8px 30px rgba(0,0,0,0.12);
            }
            .bp3-popover .bp3-popover-arrow-border {
              fill: #ffffff;
            }
            .bp3-popover.popover-success .bp3-popover-arrow-fill {
              fill: rgb(220, 240, 232);
            }
            .bp3-menu-item:hover, .bp3-submenu .bp3-popover-target.bp3-popover-open > .bp3-menu-item {
              background-color: rgba(233, 233, 233, 0.6);
            }
            .bp3-menu-item {
              padding: 8px 12px;
            }
            .bp3-menu {
              padding: 5px 0;
            }
            .bp3-menu-header {
              padding: 8px 12px 8px 12px;
            }
            .bp3-overlay-backdrop {
              background-color: rgba(16, 22, 26, 0.3);
            }
          `}</style>
        </Styled.root>
      </ThemeProvider>
    )
  }
}