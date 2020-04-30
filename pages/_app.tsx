import React from 'react'
import App from 'next/app'
import { ThemeProvider, Styled } from 'theme-ui'
import theme from '../theme'
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css"
import '../utils/sentry'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
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