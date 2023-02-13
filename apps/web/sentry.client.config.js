import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

// Copied from: https://gist.github.com/Chocksy/e9b2cdd4afc2aadc7989762c4b8b495a
export const sentryOptions = {
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  // Will cause a deprecation warning, but the demise of `ignoreErrors` is still under discussion.
  // See: https://github.com/getsentry/raven-js/issues/73
  ignoreErrors: [
    'User rejected request',
    'Error: call revert exception',
    // Random plugins/extensions
    'top.GLOBALS',
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'http://tt.epicplay.com',
    "Can't find variable: ZiteReader",
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'http://loading.retry.widdit.com/',
    'atomicFindClose',
    // Facebook borked
    'fb_xd_fragment',
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    'conduitPage',
    // Generic error code from errors outside the security sandbox
    // You can delete this if using raven.js > 1.0, which ignores these automatically.
    'Script error.',
    // Avast extension error
    '_avast_submit',
  ],
  denyUrls: [
    // block this particular extension which errors on every page load
    /chrome-extension:\/\/ebfidpplhabeedpnhjnobghokpiioolj/i,
    // Google Adsense
    /pagead\/js/i,
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Woopra flakiness
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /safari-web-extension/i,
    /^@webkit-masked-url/i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
  ],
  beforeSend(event) {
    const frames = event.exception?.values[0].stacktrace?.frames
    if (frames && Array.isArray(frames)) {
      const lastFilename = frames[frames.length - 1]?.filename
      // as of https://github.com/getsentry/sentry-javascript/pull/3842, these
      // values are ignored by `allowUrls` and `denyUrls` if they're in the last
      // frame
      if (lastFilename === '<anonymous>' || lastFilename === '[native code]') {
        // in some cases, however, they're in *all* the frames, and in those cases
        // we *do* actually want to use the value as a filter
        if (
          frames.every(
            (frame) =>
              !frame.filename ||
              frame.filename === '<anonymous>' ||
              frame.filename === '[native code]'
          )
        ) {
          return null
        }
      }
    }

    return event
  },
}

Sentry.init(sentryOptions)
