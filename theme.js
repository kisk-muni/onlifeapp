export default {
  colors: {
    text: '#000000',
    background: '#ffffff',
    primary: '#1d7aff',
    secondary: '#111199',
    muted: '#f6f6f6',
    highlight: '#efeffe', // '#ffffcc',
    gray: '#777777',
    accent: '#660099',
    darken: 'rgba(0, 0, 0, .25)',
    modes: {
      dark: {
        text: '#ffffff',
        background: '#060606',
        primary: '#33ccff',
        secondary: '#ee00ff',
        muted: '#191919',
        highlight: '#29112c',
        gray: '#999999',
        accent: '#cc00ff',
      }
    },
  },
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 600,
    display: 600,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  sizes: {
    sidebar: 256,
    container: 1024,
  },
  text: {
    heading: {
      display: 'block',
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    display: {
      variant: 'text.heading',
      display: 'block',
      fontSize: [5, 6],
      fontWeight: 'display',
      letterSpacing: '-0.03em',
      mt: 3,
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
  },
  buttons: {
    default: {
      padding: '10px 18px',
      borderRadius: 6,
      fontWeight: 'bold',
      '&:hover, &:focus': {
        outline: 'none',
      }
    },
    primary: {
      variant: 'buttons.default',
      color: 'background',
      bg: 'primary',
      '&:hover': {
        background: '#1973f3',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        cursor: 'pointer' 
      },
      '&:focus': {
        background: '#156eea',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        cursor: 'pointer' 
      }
    },
    secondary: {
      variant: 'buttons.default',
      color: 'rgba(0, 0, 0, .6)',
      bg: 'transparent',
      '&:hover': {
        background: 'rgba(0,0,0,0.1)',
        cursor: 'pointer' 
      },
      '&:focus': {
        background: 'rgba(0,0,0,0.2)',
        cursor: 'pointer' 
      }
    },
    groupSelect: {
      variant: 'buttons.default',
      fontSize: 1,
      px: '6px',
      py: '4px',
      mx: '-6px',
      fontWeight: 400,
      color: 'rgba(255,255,255,0.7)',
      border: 'none',
      background: 'transparent',
      '&:hover, &:focus': {
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.9)',
        background: 'rgba(0,0,0,0.08)',
        outline: 'none',
        boxShadow: 'none'
      }
    },
    black: {
      fontWeight: 'bold',
      color: 'background',
      bg: 'text',
      '&:hover, &:focus': {
        bg: 'primary',
      },
    },
    homepageprimary: {
      color: 'text',
      background: '#FFC107',
      borderRadius: '8px',
      padding: '16px 24px',
      textAlign: 'center',
      border: 'none',
      marginTop: '32px',
      fontWeight: 600,
      fontSize: '18px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
      ':hover': {
        background: '#f1b606',
        cursor: 'pointer',
      },
      ':focus': {
        background: '#e8b007'
      }
    },
    createclass: {
      color: 'text',
      background: '#ffffff',
      borderRadius: '6px',
      padding: '16px 24px',
      textAlign: 'center',
      border: 'none',
      marginTop: '16px',
      fontWeight: 600,
      fontSize: '16px',
      ':hover': {
        background: 'rgba(255,255,255,0.9)',
        cursor: 'pointer',
      },
      ':focus': {
        background: 'rgba(255,255,255,0.8)'
      }
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
    primary: {
      color: 'background',
    },
    highlight: {
      color: 'text',
      bg: 'highlight',
    },
    accent: {
      color: 'background',
      bg: 'accent',
    },
    outline: {
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px',
    },
    circle: {
      height: 16,
      minWidth: 16,
      lineHeight: '16px',
      textAlign: 'center',
      borderRadius: 9999,
    },
  },
  images: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 9999,
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'muted',
    },
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: 'bold',
    },
    input: {
      padding: '10px 12px',
      borderColor: 'gray',
      '&:focus': {
        borderColor: 'primary',
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none',
      },
    },
    select: {
      borderColor: 'gray',
      '&:focus': {
        borderColor: 'primary',
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none',
      },
    },
    textarea: {
      borderColor: 'gray',
      '&:focus': {
        borderColor: 'primary',
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none',
      },
    },
    slider: {
      bg: 'muted',
    },
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
      p: 3,
      // maxWidth: 1024,
    },
  },
  styles: {
    root: {
      margin: 0,
      overflowX: 'hidden',
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
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
        borderColor: 'red',
        '&:focus': {
          borderColor: 'red',
          boxShadow: 'none',
          outline: 'none'
        },
      }
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
      code: {
        color: 'inherit',
      },
      variant: 'prism',
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 1,
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
      [['th', 'td']]: {
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
    header: {},
    headerHomepage: {
      position: 'fixed',
      top: 0,
      zIndex: '19'
    },
    decoratedBox: {
      backgroundColor: '#b3ffff',
      position: 'relative',
      overflow: 'hidden'
    },
    createclassIllustration: {
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '50%',
      right: '0',
      bottom: '-3px',
      backgroundImage: "url('/undraw_people_tax5.svg')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: '400px',
      backgroundPosition: 'left bottom',
      zIndex: 4
    },
    decoratedBackground: {
      display: 'block',
      position: 'absolute',
      top: '10%',
      left: '10%',
      right: '10%',
      bottom: 0,
      backgroundImage: "url('/ilustrace.jpg')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      backgroundPosition: 'bottom',
      zIndex: 2
    },
    decoratedOverlay: {
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#0167ffe0',
      zIndex: 3
    },
    decoratedcontent: {
      position: 'relative',
      zIndex: 4
    },
    navlink: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus': {
        color: 'text',
        textDecoration: 'none'
      },
    },
    navlogo: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus': {
        color: 'text',
        textDecoration: 'none'
      },
    },
    navlogolight: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: '#ffffff',
      textDecoration: 'none',
      ':hover,:focus': {
        color: '#ffffff',
        textDecoration: 'none'
      },
    },
    navlinklight: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: 'rgba(255,255,255,0.7)',
      textDecoration: 'none',
      ':hover,:focus': {
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
      ':hover,:focus': {
        color: 'text',
        textDecoration: 'none'
      },
    },
    simpleErrorMessageText: {
      mt: 2,
      color: 'red'
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
      background: '#fff',
      py: 20,
      px: 20,
      borderRadius: '8px',
      mt: '16px',
      mb: '-16px',
      boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
    },
    groupListItem: {
      variant: 'styles.groupCard',
      height: 210,
      transition: 'background-color .1s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        background: '#f5f5f5',
        cursor: 'pointer'
      }
    },
    groupListItemButton: {
      variant: 'styles.groupListItem',
      color: 'primary',
      fontSize: 2,
      fontWeight: 600,
      '&:hover, &:focus': {
        outline: 'none',
      }
    },
  }
}