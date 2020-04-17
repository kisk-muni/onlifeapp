import Router from "next/router"
import NProgress from "nprogress"

export function includePageLoading() {
    Router.onRouteChangeStart = () => NProgress.start()
    Router.onRouteChangeComplete = () => NProgress.done()
    Router.onRouteChangeError = () => NProgress.done()
}
