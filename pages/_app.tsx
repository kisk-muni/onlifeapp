import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'theme-ui'
import theme from 'theme'
import { DefaultSeo } from 'next-seo'
import SEO from 'next-seo.config'
import "node_modules/@blueprintjs/core/lib/css/blueprint.css"

export default class MyApp extends App {

  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
          <DefaultSeo {...SEO} />
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
              background-color: rgba(0, 0, 0, 0.2);
            }
            /*
            * react-circular-progressbar styles
            * All of the styles in this file are configurable!
            */

            .CircularProgressbar {
              /*
              * This fixes an issue where the CircularProgressbar svg has
              * 0 width inside a "display: flex" container, and thus not visible.
              */
              width: 100%;
              /*
              * This fixes a centering issue with CircularProgressbarWithChildren:
              * https://github.com/kevinsqi/react-circular-progressbar/issues/94
              */
              vertical-align: middle;
            }

            .CircularProgressbar .CircularProgressbar-path {
              stroke: #3e98c7;
              stroke-linecap: round;
              transition: stroke-dashoffset 0.5s ease 0s;
            }

            .CircularProgressbar .CircularProgressbar-trail {
              stroke: #d6d6d6;
              /* Used when trail is not full diameter, i.e. when props.circleRatio is set */
              stroke-linecap: round;
            }

            .CircularProgressbar .CircularProgressbar-text {
              fill: #3e98c7;
              font-size: 20px;
              dominant-baseline: middle;
              text-anchor: middle;
            }

            .CircularProgressbar .CircularProgressbar-background {
              fill: #d6d6d6;
            }

            /*
            * Sample background styles. Use these with e.g.:
            *
            *   <CircularProgressbar
            *     className="CircularProgressbar-inverted"
            *     background
            *     percentage={50}
            *   />
            */
            .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-background {
              fill: #3e98c7;
            }

            .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text {
              fill: #fff;
            }

            .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path {
              stroke: #fff;
            }

            .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail {
              stroke: transparent;
            }

            .bp3-transition-container {
              z-index: 120;
            }
          `}</style>
      </ThemeProvider>
    )
  }
}