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
    thumbnail: '/course/ilustrace-1-thumbnail.jpg',
    picture: '/course/ilustrace-1.jpg',
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
    thumbnail: '/course/ilustrace-2-thumbnail.jpg',
    picture: '/course/ilustrace-2.jpg',
    subtopics: []
  },
  {
    id: 'media-a-obcanstvi',
    name: 'Média a občanství',
    thumbnail: '/course/ilustrace-3-thumbnail.jpg',
    picture: '/course/ilustrace-3.jpg',
    subtopics: []
  },
  {
    id: 'prace-s-dokumenty',
    name: 'Práce s dokumenty',
    thumbnail: '/course/ilustrace-4-thumbnail.jpg',
    picture: '/course/ilustrace-4.jpg',
    subtopics: []
  },
  {
    id: 'interakce-vzajemnost-a-zpetna-vazba',
    name: 'Interakce, vzájemnost a zpětná vazba',
    thumbnail: '/course/ilustrace-5-thumbnail.jpg',
    picture: '/course/ilustrace-5.jpg',
    subtopics: []
  },
  {
    id: 'bezpeci-a-ferovost',
    name: 'Bezpečí a férovost',
    thumbnail: '/course/ilustrace-6-thumbnail.jpg',
    picture: '/course/ilustrace-6.jpg',
    subtopics: []
  },
]