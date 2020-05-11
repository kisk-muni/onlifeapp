export const quizes = {
  'quiz-vyhledavani-na-internetu-i': {
    name: 'Vyhledávání na internetu I',
    display: true,
    gFormURL: 'https://docs.google.com/forms/d/e/1FAIpQLSfrLT1wsA6x8ofB47itturNEhCbMMNJtzS0tnSqTR9D4QHIjg/viewform?usp=pp_url&entry.598075797='
  },
  'quiz-vyhledavani-na-internetu-ii-kde-vyhledavat': {
    name: 'Vyhledávání na internetu II: Kde vyhledávat',
    display: true,
    gFormURL: 'https://docs.google.com/forms/d/e/1FAIpQLSe4wc-00YQEW4gsI8IHGJsJnGFcDS3hmwaFuv1gUT1Zm0Q2gw/viewform?usp=pp_url&entry.1102572523='
  },
  'quiz-vyhledavani-na-internetu-iii-jak-vyhledavat': {
    name: 'Vyhledávání na internetu III: Jak vyhledávat?',
    display: true,
    gFormURL: 'https://docs.google.com/forms/d/e/1FAIpQLSfV6zkUeq88AOy8Xrz8keyPydK8uRgaXPJXvhiHxUzqMlndZg/viewform?usp=pp_url&entry.524321185='
  },
  'quiz-filtrovani-vysledku': {
    name: 'Filtrování výsledků',
    display: true,
    gFormURL: 'https://docs.google.com/forms/d/e/1FAIpQLSeMuqrB4EOVWFsfuUYhDFZF3Eb0NpYckJwjXjj6SEPK2TSh0w/viewform?usp=pp_url&entry.1750465254='
  },
  'quiz-hodnoceni-informaci': {
    name: 'Hodnocení informací',
    display: true,
    gFormURL: 'https://docs.google.com/forms/d/e/1FAIpQLSfqwiad252vGe9LmJB-Cq4ahxfGCqY5iWxwJ2y9X1QHmvcZng/viewform?usp=pp_url&entry.1366782117='
  },
  'quiz-hodnoceni-informaci-dezinformace-a-manipulace-s-informacemi': {
    name: 'Hodnocení informací: Dezinformace a manipulace s informacemi',
    display: true,
    gFormURL: 'https://docs.google.com/forms/d/e/1FAIpQLSdc17dWY4T7LKHoNomWkJ4OnWNn5A-gNgFs9ZH3alfoQtQywg/viewform?usp=pp_url&entry.1902632650='
  },
  'quiz-hodnoceni-informaci-wikipedie': {
    name: 'Hodnocení informací: Wikipedie',
    display: true,
    gFormURL: 'https://docs.google.com/forms/d/e/1FAIpQLSeERP3wAWd1C627rr5gaW1pV471HVID26s02jb0ODKi4QPGAA/viewform?usp=pp_url&entry.944098572='
  },
  'quiz-vyuziti-informaci': {
    name: 'Využití informací',
    display: true,
    gFormURL: 'https://docs.google.com/forms/d/e/1FAIpQLScW5he5LwhQ0VcupthK81MhLFNxbb0t_4edMl5VoKCffc1MuA/viewform?usp=pp_url&entry.2038019138='
  }
}

export default [
  {
    id: 'faze-prace-s-informacemi',
    name: 'Fáze práce s informacemi',
    thumbnail: 'https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:good,w_570/v1589196349/ilustrace-1-thumbnail_ivxlxg.jpg',
    picture: 'https://res.cloudinary.com/diwkzuny7/image/upload/q_auto:best/v1589196349/ilustrace-1_us1zkq.jpg',
    subtopics: [
      {
        id: 'vyhledavani-na-internetu-i',
        name: 'Vyhledávání na internetu I',
        quiz: 'quiz-vyhledavani-na-internetu-i'
      },
      {
        id: 'vyhledavani-na-internetu-ii-kde-vyhledavat',
        name: 'Vyhledávání na internetu II: Kde vyhledávat',
        quiz: 'quiz-vyhledavani-na-internetu-ii-kde-vyhledavat'
      },
      {
        id: 'vyhledavani-na-internetu-iii-jak-vyhledavat',
        name: 'Vyhledávání na internetu III: Jak vyhledávat?',
        quiz: 'quiz-vyhledavani-na-internetu-iii-jak-vyhledavat'
      },
      {
        id: 'filtrovani-vysledku',
        name: 'Filtrování výsledků',
        quiz: 'quiz-filtrovani-vysledku'
      },
      {
        id: 'hodnoceni-informaci',
        name: 'Hodnocení informací',
        quiz: 'quiz-hodnoceni-informaci'
      },
      {
        id: 'hodnoceni-informaci-dezinformace-a-manipulace-s-informacemi',
        name: 'Hodnocení informací: Dezinformace a manipulace s informacemi',
        quiz: 'quiz-hodnoceni-informaci-dezinformace-a-manipulace-s-informacemi'
      },
      {
        id: 'hodnoceni-informaci-wikipedie',
        name: 'Hodnocení informací: Wikipedie',
        quiz: 'quiz-hodnoceni-informaci-wikipedie'
      },
      {
        id: 'vyuziti-informaci',
        name: 'Využití informací',
        quiz: 'quiz-vyuziti-informaci'
      },
      {
        id: 's-informacemi-k-reseni-problemu',
        name: 'S informacemi k řešení problému',
        quiz: null
      },
    ]
  },
  {
    id: 'prace-s-informacemi-a-uceni',
    name: 'Práce s informacemi a učení',
    thumbnail: 'https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_570/v1589196349/ilustrace-2-thumbnail_rsehxf.jpg',
    picture: 'https://res.cloudinary.com/diwkzuny7/image/upload/q_auto:best/v1589196349/ilustrace-2_kpdssm.jpg',
    subtopics: []
  },
  {
    id: 'media-a-obcanstvi',
    name: 'Média a občanství',
    thumbnail: 'https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_570/v1589196349/ilustrace-3-thumbnail_opvups.jpg',
    picture: 'https://res.cloudinary.com/diwkzuny7/image/upload/q_auto:best/v1589196349/ilustrace-3_ox0ziw.jpg',
    subtopics: []
  },
  {
    id: 'prace-s-dokumenty',
    name: 'Práce s dokumenty',
    thumbnail: 'https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_570/v1589196349/ilustrace-4-thumbnail_or37am.jpg',
    picture: 'https://res.cloudinary.com/diwkzuny7/image/upload/q_auto:best/v1589196349/ilustrace-4_wiluqb.jpg',
    subtopics: []
  },
  {
    id: 'interakce-vzajemnost-a-zpetna-vazba',
    name: 'Interakce, vzájemnost a zpětná vazba',
    thumbnail: 'https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_570/v1589196349/ilustrace-5-thumbnail_rasg3r.jpg',
    picture: 'https://res.cloudinary.com/diwkzuny7/image/upload/q_auto:best/v1589196349/ilustrace-5_t4e5rv.jpg',
    subtopics: []
  },
  {
    id: 'bezpeci-a-ferovost',
    name: 'Bezpečí a férovost',
    thumbnail: 'https://res.cloudinary.com/diwkzuny7/image/upload/c_scale,q_auto:best,w_570/v1589196349/ilustrace-6-thumbnail_rpxr8w.jpg',
    picture: 'https://res.cloudinary.com/diwkzuny7/image/upload/q_auto:best/v1589196349/ilustrace-6_kyqt0b.jpg',
    subtopics: []
  },
]