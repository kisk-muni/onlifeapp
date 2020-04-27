import { Toaster, Position } from '@blueprintjs/core'

// Singleton toaster instance. Create separate instances for different options.
// Check for ssr inspired by: https://github.com/palantir/blueprint/issues/1205
export const AppNotifier = (typeof window !== 'undefined')
  ? Toaster.create({
      className: "toaster-notification",
      position: Position.TOP,
    })
  : null