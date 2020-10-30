const theme = {
  colors: {
    darker: "#121217",
    dark: "#17171d",
    darkless: "#252429",
    black: "#1f2d3d",
    steel: "#273444",
    slate: "#3c4858",
    muted: "#8492a6",
    smoke: "#e0e6ed",
    snow: "#f9fafc",
    white: "#ffffff",
    red: "#ec3750",
    orange: "#ff8c37",
    yellow: "#f1c40f",
    green: "#33d6a6",
    cyan: "#5bc0de",
    blue: "#338eda",
    purple: "#a633d6",
    twitter: "#1da1f2",
    facebook: "#3b5998",
    instagram: "#e1306c",
    text: "#1f2d3d",  
    background: "#ffffff",
    foreground: "#000000",
    elevated: "#ffffff",
    sheet: "#f9fafc",
    sunken: "#e0e6ed",
    border: "#e0e6ed",
    placeholder: "#8492a6",
    secondary: "#3c4858",
    primary: "#0000dc",
    accent: "#338eda",
    "error-lighter": "#F7D4D6",
    "error-light": "#FF1A1A",
    "error-default": "#E00",
    "error-dark": "#C50000",
    "success-default": "#0d8000",
    "primary-background": "#FFF",
    "primary-accent-1": "#FAFAFA",
    "primary-accent-2": "#EAEAEA",
    "primary-accent-3": "#999",
    "primary-accent-4": "#888",
    "primary-accent-5": "#666",
    "primary-accent-6": "#444",
    "primary-accent-7": "#333",
    "primary-accent-8": "#111",
    "primary-foreground": "#000",
    promobg: '#f5f5f5',
    modes: {
      dark: {
        text: "#ffffff",
        background: "#17171d",
        elevated: "#252429",
        sheet: "#252429",
        sunken: "#121217",
        border: "#252429",
        placeholder: "#3c4858",
        secondary: "#8492a6",
        muted: "#8492a6",
        accent: "#5bc0de"
      }
    }
  },
  fonts: {
    heading: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif",
    body: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif",
    monospace: "\"SF Mono\", \"Roboto Mono\", Menlo, Consolas, monospace"
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
    display: 600,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  sizes: {
    sidebar: 256,
    resultsFilterSidebar: 340,
    container: 1024,
    articleContainer: 768,
    widePlus: 2048,
    wide: 1536,
    layoutPlus: 1200,
    layout: 1024,
    copyUltra: 980,
    copyPlus: 768,
    copy: 680,
    narrowPlus: 600,
    narrow: 512
  },
  radii: {
    none: 0,
    small: 4,
    default: 8,
    extra: 12,
    ultra: 16,
    circle: 99999
  },
  shadows: {
    text: "0 1px 2px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.125)",
    small: "0 1px 2px rgba(0, 0, 0, 0.0625), 0 2px 4px rgba(0, 0, 0, 0.0625)",
    card: "0 4px 8px rgba(0, 0, 0, 0.125)",
    elevated: "0 1px 2px rgba(0, 0, 0, 0.0625), 0 8px 12px rgba(0, 0, 0, 0.125)"
  },
  text: {
    heading: {
      fontWeight: "bold",
      lineHeight: "heading",
      mt: 0,
      mb: 0
    },
    ultratitle: {
      fontSize: [
        5,
        6,
        7
      ],
      lineHeight: "limit",
      fontWeight: "bold",
      letterSpacing: "title"
    },
    title: {
      fontSize: [
        4,
        5,
        6
      ],
      fontWeight: "bold",
      letterSpacing: "title",
      lineHeight: "title"
    },
    subtitle: {
      mt: 3,
      fontSize: [
        2,
        3
      ],
      fontWeight: "body",
      letterSpacing: "headline",
      lineHeight: "subheading"
    },
    headline: {
      variant: "text.heading",
      letterSpacing: "headline",
      lineHeight: "heading",
      fontSize: 4,
      mt: 3,
      mb: 3
    },
    subheadline: {
      variant: "text.heading",
      letterSpacing: "headline",
      fontSize: 2,
      mt: 0,
      mb: 3
    },
    eyebrow: {
      color: "muted",
      fontSize: [
        3,
        4
      ],
      fontWeight: "heading",
      letterSpacing: "headline",
      lineHeight: "subheading",
      textTransform: "uppercase",
      mt: 0,
      mb: 2
    },
    lead: {
      fontSize: [
        2,
        3
      ],
      my: [
        2,
        3
      ]
    },
    caption: {
      color: "muted",
      fontWeight: "medium",
      letterSpacing: "headline",
      lineHeight: "caption"
    }
  },
  buttons: {
    primary: {
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: "bold",
      borderRadius: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "card",
      letterSpacing: "headline",
      WebkitTapHighlightColor: "transparent",
      transition: "transform .125s ease-in-out, box-shadow .125s ease-in-out",
      ":focus,:hover": {
        boxShadow: "elevated",
        transform: "scale(1.0625)"
      },
      svg: {
        ml: 2,
        mr: 0
      }
    },
    lg: {
      variant: "buttons.primary",
      fontSize: 3,
      lineHeight: "title",
      px: 4,
      py: 3
    },
    secondary: {
      variant: "buttons.primary",
      bg: "transparent",
      color: "black",
      transition: "background-color .125s ease-in-out",
      boxShadow: "none",
      ":focus,:hover": {
        bg: "smoke",
      },
    },
    outline: {
      variant: "buttons.primary",
      bg: "transparent",
      color: "primary",
      border: "2px solid currentColor"
    },
    outlineLg: {
      variant: "buttons.primary",
      bg: "transparent",
      color: "primary",
      border: "2px solid currentColor",
      lineHeight: "title",
      fontSize: 3,
      px: 4,
      py: 3
    },
    cta: {
      variant: "buttons.primary",
      fontSize: 2
    },
    ctaLg: {
      variant: "buttons.primary",
      lineHeight: "title",
      fontSize: 3,
      px: 4,
      py: 3
    },
    menu: {
      variant: "buttons.primary",
      fontWeight: "normal",
      boxShadow: 'none',
      borderRadius: "circle",
      transition: "transform .125s ease-in-out, background-color .125s ease-in-out",
      bg: 'white',
      color: "secondary",
      fontSize: 2,
      ":focus,:hover": {
        bg: "smoke",
        transform: 'none',
        boxShadow: 'none',
      },
    },
    menuActive: {
      variant: "buttons.menu",
      color: 'text',
      fontWeight: "bold",
      bg: "smoke"
    },
    // old
    statsAction: {
      bg: 'background',
      border: '1px solid',
      fontWeight: 500,
      py: '6px',
      px: '12px',
      '&:hover': {
        borderColor: '#000',
        color: '#000',
        cursor: 'pointer',
        backgroundColor: 'background'
      },
      borderColor: '#eaeaea',
      color: '#666'
    },
    studentsFilterAction: {
      bg: 'background',
      border: '1px solid',
      fontWeight: 500,
      py: 2,
      px: 3,
      '&:hover': {
        borderColor: '#000',
        color: '#000',
        cursor: 'pointer',
        backgroundColor: 'background'
      },
      '&:focus': {
        outline: 'none',
      },
      borderColor: '#ddd',
      color: '#666'
    },
    detailAction: {
      variant: "buttons.primary",
      fontWeight: "normal",
      boxShadow: 'none',
      borderRadius: "circle",
      transition: "transform .125s ease-in-out, background-color .125s ease-in-out",
      bg: 'primary-accent-2',
      color: "secondary",
      fontSize: 2,
      ":focus,:hover": {
        bg: "smoke",
        color: 'primary',
        transform: 'none',
        boxShadow: 'none',
      },
    },
  },
  links: {
    nav: {
      display: 'block',
      width: '100%',
      px: 2,
      py: 2,
      color: 'inherit',
      textDecoration: 'none',
      fontSize: 1,
      fontWeight: 'bold',
      bg: 'transparent',
      transitionProperty: 'background-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '.2s',
      borderRadius: 2,
      '&:hover': {
        bg: 'highlight',
        color: 'text',
        textDecoration: 'none',
        cursor: 'pointer',
      },
      '&.active': {
        color: 'primary',
        bg: 'highlight',
      },
    },
  },
  badges: {
    pill: {
      borderRadius: "circle",
      px: 3,
      py: 1,
      fontSize: 1
    },
    outline: {
      variant: "badges.pill",
      bg: "transparent",
      border: "1px solid",
      borderColor: "currentColor",
      fontWeight: "body"
    },
    count: {
      fontWeight: '600',
      borderRadius: "circle",
      px: '8px',
      fontSize: '14px',
      bg: 'smoke',
      color: 'text'
    }
  },
  images: {
    avatar: {
      width: 38,
      height: 38,
      borderRadius: 9999,
    },
  },
  cards: {
    primary: {
      bg: "elevated",
      color: "text",
      p: [
        3,
        4
      ],
      borderRadius: "none",
      boxShadow: "card",
      overflow: "hidden"
    },
    sunken: {
      bg: "sunken",
      p: [
        3,
        4
      ],
      borderRadius: "extra"
    },
    interactive: {
      variant: "cards.primary",
      textDecoration: "none",
      WebkitTapHighlightColor: "transparent",
      transition: "transform .125s ease-in-out, box-shadow .125s ease-in-out",
      ":hover,:focus": {
        transform: "scale(1.0625)",
        boxShadow: "elevated"
      }
    },
    translucent: Object.create(null),
    translucentDark: Object.create(null)
  },
  forms: {
    input: {
      bg: "elevated",
      color: "text",
      fontFamily: "inherit",
      borderRadius: "base",
      border: 0,
      "::-webkit-input-placeholder": {
        color: "placeholder"
      },
      "::-moz-placeholder": {
        color: "placeholder"
      },
      ":-ms-input-placeholder": {
        color: "placeholder"
      },
      "&[type=\"search\"]::-webkit-search-decoration": {
        display: "none"
      }
    },
    textarea: {
      variant: "forms.input"
    },
    select: {
      variant: "forms.input"
    },
    label: {
      color: "text",
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      lineHeight: "caption",
      fontSize: 2
    },
    labelHoriz: {
      color: "text",
      display: "flex",
      alignItems: "center",
      textAlign: "left",
      lineHeight: "caption",
      fontSize: 2,
      svg: {
        color: "muted"
      }
    },
    slider: {
      color: "primary"
    },
    hidden: {
      position: "absolute",
      height: "1px",
      width: "1px",
      overflow: "hidden",
      clip: "rect(1px, 1px, 1px, 1px)",
      whiteSpace: "nowrap"
    }
  },
  alerts: {
    primary: {
      color: 'background',
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
    },
    accent: {
      color: 'background',
      bg: 'accent',
    },
    highlight: {
      color: 'text',
      bg: 'highlight',
    },
  },
  layout: {
    container: {
      maxWidth: [
        "layout",
        null,
        "layoutPlus"
      ],
      width: "100%",
      mx: "auto",
      px: 3
    },
    wide: {
      variant: "layout.container",
      maxWidth: [
        "layout",
        null,
        "wide"
      ]
    },
    copy: {
      variant: "layout.container",
      maxWidth: [
        "copy",
        null,
        "copyPlus"
      ]
    },
    narrow: {
      variant: "layout.container",
      maxWidth: [
        "narrow",
        null,
        "narrowPlus"
      ]
    }
  },
  styles: {
    root: {
      margin: 0,
      overflowX: 'hidden',
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      fontFeatureSettings: 'kern',
      textRendering: 'optimizeLegibility',
      webkitFontSmoothing: 'antialiased',
      mozOsxFontSmoothing: 'grayscale',
      scrollBehavior: 'smooth',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
    h1: {
      variant: 'text.display',
    },
    h2: {
      variant: 'text.heading',
      fontSize: 5,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 4,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 1,
    },
    a: {
      color: 'primary',
      '&:hover': {
        cursor: 'pointer',
        color: 'secondary',
      },
    },
    pre: {
      fontFamily: "monospace",
      fontSize: 1,
      p: 3,
      color: "text",
      bg: "sunken",
      overflow: "auto",
      borderRadius: "default",
      code: {
        color: "inherit",
        mx: 0,
        ".comment.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url": {
          color: "muted"
        },
        ".comment": {
          fontStyle: "italic"
        },
        ".property .tag, .boolean, .number, .constant, .symbol, .deleted, .function, .class-name, .regex, .important, .variable": {
          color: "red"
        },
        ".atrule .attr-value, .keyword": {
          color: "blue"
        },
        ".selector .attr-name, .string, .char, .builtin, .inserted": {
          color: "orange"
        }
      }
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
      color: "accent",
      bg: "sunken",
      borderRadius: "small",
      mx: 1,
      px: 1
    },
    forms: {
      simpleinput: {
        padding: '10px 6px',
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: '2px solid',
        borderColor: 'gray',
        borderRadius: 0,
        '&:focus': {
          borderColor: 'primary',
          boxShadow: 'none',
          //boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
          outline: 'none',
        },
      },
      simpleinputError: {
        variant: 'styles.forms.simpleinput',
        borderColor: 'error',
        '&:focus': {
          borderColor: 'error',
          boxShadow: 'none',
          outline: 'none'
        },
      }
    },
    progressDonut: {
      color: 'success-default',
    },
    engagementDonut: {
      color: 'primary',
    },
    topicCard: {
      '&:hover .aspect-image, &focus .aspect-image': {
        boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)'
      }
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted',
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      'th,td': {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid',
      },
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px',
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px',
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted',
    },
    xray: {
      '*': {
        outline: '1px solid rgba(0, 192, 255, .25)',
      },
    },
    helpcard: {
      height: '208px',
      padding: '20px',
      backgroundColor: 'transparent',
      borderRadius: '8px',
      border: '1px solid rgba(0,0,0,.12)',
      boxShadow: 'none'
    },
    header: {
      py: 3,
      px: 3,
      zIndex: 100,
      boxShadow: '0 0 15px 0 rgba(0,0,0,.1)',
      backgroundColor: 'background',
    },
    navlink: {
      display: 'inline-block',
      fontWeight: 'body',
      fontSize: 2,
      color: '#666',
      textDecoration: 'none',
      '&:hover, &:focus': {
        color: 'text',
        textDecoration: 'none'
      }
    },
    subnavlink: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
      pb: 3,
      mr: 4,
      pt: 3,
      '&:hover, &:focus': {
        color: 'text',
        textDecoration: 'none'
      }
    },
    navlogo: {
      display: 'inline-block',
      fontWeight: '700',
      fontSize: 4,
      color: 'black',
      textDecoration: 'none',
      '&:hover, &:focus': {
        color: 'text',
        textDecoration: 'none'
      },
    },
    navlogolight: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: 'background',
      textDecoration: 'none',
      '&:hover, &:focus': {
        color: 'background',
        textDecoration: 'none'
      },
    },
    navlinklight: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: 'rgba(255,255,255,0.7)',
      textDecoration: 'none',
      '&:hover, &:focus': {
        color: 'rgba(255,255,255,0.9)',
        textDecoration: 'none'
      },
    },
    footer: {
      textAlign: 'center'
    },
    footerlink: {
      display: 'inline',
      fontWeight: 'body',
      color: 'gray',
      '&:hover, &:focus': {
        color: 'text',
        textDecoration: 'none'
      },
    },
    simpleErrorMessageText: {
      mt: 2,
      color: 'error'
    },
    groupHelpCard: {
      mt: '16px',
      padding: '20px',
      backgroundColor: 'transparent',
      borderRadius: '8px',
      border: '1px solid rgba(0,0,0,.12)',
      boxShadow: 'none'
    },
    groupCard: {
      backgroundColor: 'background',
      py: 20,
      px: 20,
      borderRadius: '8px',
      boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
    },
    groupListItem: {
      variant: 'styles.groupCard',
      height: 210,
      transition: 'background-color .1s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: 'accentOne',
        cursor: 'pointer'
      }
    },
    groupListItemButton: {
      variant: 'styles.groupListItem',
      color: 'rgba(0, 0, 0, .7)',
      fontSize: 2,
      fontWeight: 600,
      '&:hover, &:focus': {
        outline: 'none',
      }
    },
    dashboard: {
      navlink: {
        display: 'inline-block',
        fontWeight: 400,
        color: 'gray',
        textDecoration: 'none',
        '&:hover, &:focus': {
          color: 'text',
          textDecoration: 'none'
        },
      },
      navlinkactive: {
        variant: 'styles.dashboard.navlink',
        color: 'text',
        borderBottom: '2px solid',
        borderColor: 'text'
      }
    }
  },
  util: Object.create(null)
}

theme.util = {
  motion: '@media (prefers-reduced-motion: no-preference)',
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
  reduceTransparency: '@media (prefers-reduced-transparency: reduce)',
  supportsClipText: '@supports (-webkit-background-clip: text)',
  supportsBackdrop:
    '@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)',
  cx: null,
  gx: null,
  gxText: null
}
theme.util.cx = (c: string): string => theme.colors[c] || c
theme.util.gx = (from: string, to: string): string => `radial-gradient(
  ellipse farthest-corner at top left,
  ${theme.util.cx(from)},
  ${theme.util.cx(to)}
)`
theme.util.gxText = (from: string, to: string) => ({
  color: theme.util.cx(to),
  [theme.util.supportsClipText]: {
    backgroundImage: theme.util.gx(from, to),
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }
})

theme.cards.translucent = {
  // variant: 'cards.primary',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  color: 'text',
  boxShadow: 'none',
  [theme.util.supportsBackdrop]: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'saturate(180%) blur(20px)',
    WebkitBackdropFilter: 'saturate(180%) blur(20px)'
  },
  [theme.util.reduceTransparency]: {
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none'
  }
}
theme.cards.translucentDark = {
  // variant: 'cards.primary',
  backgroundColor: 'rgba(0, 0, 0, 0.875)',
  color: 'white',
  boxShadow: 'none',
  [theme.util.supportsBackdrop]: {
    backgroundColor: 'rgba(0, 0, 0, 0.625)',
    backdropFilter: 'saturate(180%) blur(16px)',
    WebkitBackdropFilter: 'saturate(180%) blur(16px)'
  },
  [theme.util.reduceTransparency]: {
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none'
  }
}

export default theme