export default {
  colors: {
    text: '#000000',
    background: '#ffffff',
    primary: '#0000dc',
    secondary: '#111199',
    muted: '#f6f6f6',
    error: 'red', 
    highlight: '#efeffe', // '#ffffcc',
    gray: '#777777',
    accent: '#660099',
    accentOne: '#f5f5f5',
    darken: 'rgba(0, 0, 0, .25)',
    lighten: 'rgba(255, 255, 255, .25)',
    promobg: '#f5f5f5',
  },
  fonts: {
    body: '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Ubuntu","Droid Sans","Helvetica Neue",sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 600,
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
      },
    },
    primary: {
      variant: 'buttons.default',
      color: 'background',
      bg: 'primary',
      '&:hover': {
        background: '#1515f7',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        cursor: 'pointer',
//        transform: 'translate3d(0px,-1px,0px)',
      },
      '&:focus': {
        background: '#2626fb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        cursor: 'pointer' 
      },
      '&:disabled': {
        cursor: 'not-allowed!important',
        boxShadow: 'none',
        opacity: 0.3
      },
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
    detailAction: {
      background: 'transparent',
      color: 'gray',
      borderRadius: 6,
      fontWeight: 'regular',
      border: '1px solid #ddd',
      ml: 2,
      py: '6px',
      px: '12px',
      '&:hover': {
        background: '#fafafa',
        color: 'text',
        cursor: 'pointer'
      },
      '&:focus': {
        outline: 'none',
      },
    },
    groupSelect: {
      variant: 'buttons.default',
      fontSize: 3,
      px: '6px',
      py: '4px',
      mx: 3,
      fontWeight: 600,
      color: 'text',
      border: 'none',
      background: 'transparent',
      '&:hover, &:focus': {
        cursor: 'pointer',
        color: 'text',
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
      color: 'background',
      background: 'primary',
      borderRadius: '8px',
      padding: '16px 24px',
      textAlign: 'center',
      border: 'none',
      marginTop: '32px',
      fontWeight: 400,
      fontSize: 2,
      ':hover': {
        background: 'primary',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: 'none'
      },
      ':focus': {
        background: 'primary'
      }
    },
    createclass: {
      variant: 'buttons.primary',
      fontSize: 4,
      fontWeight: 500
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
      bg: 'primary',
      py: '2px',
      fontSize: 1,
      px: '10px',
      borderRadius: '14px', 
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
      px: 2,
      maxWidth: 1024,
    },
    articleContentContainer: {
      maxWidth: 720,
      px: 2,
    },
    articleQuizBlockContainer: {
      maxWidth: 720,
    },
    quiz: {
      maxWidth: 960,
    },
    statsContainer: {
      maxWidth: 770,
    },
    groupContainer: {
      maxWidth: 1024,
      px: 2,
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
        borderColor: 'error',
        '&:focus': {
          borderColor: 'error',
          boxShadow: 'none',
          outline: 'none'
        },
      }
    },
    topicCard: {
      '&:hover .aspect-image, &focus .aspect-image': {
        boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)'
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
    header: {
      py: 2,
      background: 'rgba(255, 255, 255, .8)',
    },
    navlink: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
      '&:hover, &:focus': {
        color: 'text',
        textDecoration: 'none'
      }
    },
    navlogo: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: 'inherit',
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
      header: {
        py: 2,
        background: 'rgba(255, 255, 255, .8)',
      },
      groupHeader: {
        pt: 2,
        background: 'rgba(255, 255, 255, .8)',
      },
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
  }
}