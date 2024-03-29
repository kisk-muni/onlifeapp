const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.CMS_DATOCMS_API_TOKEN

// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(`
    {
      allPosts {
        slug
      }
    }
  `)
  return data?.allPosts
}

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String) {
    post(filter: {slug: {eq: $slug}}) {
      id
      titulek
      slug
      position
      parent {
        slug
        titulek
        children {
          titulek
          position
          slug
        }
      }
      children {
        id
        slug
        titulek
      }
      content {
        ... on TextRecord {
          id
          text(markdown: true)
          _modelApiKey
        }
        ... on QuizblockRecord {
          id
          quizLink {
            title
            slug
          }
          description
          _modelApiKey
        }
        ... on LeadingTextRecord {
          id
          text(markdown: true)
          _modelApiKey
        }
        ... on YoutubeVideoRecord {
          id
          url
          description
          _modelApiKey
        }
        ... on ImageRecord {
          id
          _modelApiKey
          description
          image {
            responsiveImage(imgixParams: {fm: jpg, fit: scale, w: 860 }) {
              ...responsiveImageFragment
            }
          }
        }
      }
      seoMeta {
        description
        title
        twitterCard
        image {
          url
        }
      }
      ogImage: picture {
        url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
      }
      picture {
        responsiveImage(imgixParams: {fm: jpg, fit: scale, w: 2000 }) {
          ...responsiveImageFragment
        }
      }
    }
    topics: allPosts(filter: {parent: {exists: "false"}}) {
      id
      titulek
      position
      slug
      thumbnailPicture {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 300, h: 500 }) {
          ...responsiveImageFragment
        }
      }
    }
  }
  ${responsiveImageFragment}
  `,
    {
      preview,
      variables: {
        slug,
      },
    }
  )
  return data
}

export async function getAllGFQuizzesWithSlug() {
  const data = fetchAPI(`
    {
      allGfquizzes {
        slug
      }
    }
  `)
  return data?.allGfquizzes
}

export async function getGFQuizWithSlug(slug, preview) {
  const data = await fetchAPI(
    `
  query QuizBySlug($slug: String) {
    gfquiz(filter: {slug: {eq: $slug}}) {
      id
      slug
      title
      items {
        ... on SingleselectRecord {
          id
          question
          required
          discarded
          picture {
            responsiveImage(imgixParams: {fm: jpg, maxW: 960 }) {
              ...responsiveImageFragment
            }
          }
          possibleResponds
          _modelApiKey
        }
        ... on CheckboxRecord {
          id
          possibleResponds
          required
          discarded
          question
          picture {
            responsiveImage(imgixParams: {fm: jpg, maxW: 960 }) {
              ...responsiveImageFragment
            }
          }
          _modelApiKey
        }
      }
    }
  }
  ${responsiveImageFragment}
  `,
    {
      preview,
      variables: {
        slug,
      },
    }
  )
  return data
}

export async function getGFQuizWithSlugforValidation(slug, preview) {
  const data = await fetchAPI(
    `
    query QuizBySlug($slug: String) {
      gfquiz(filter: {slug: {eq: $slug}}) {
      id
      slug
      title
      items {
        ... on SingleselectRecord {
          id
          question
          required
          discarded
          possibleResponds
          _modelApiKey
        }
        ... on CheckboxRecord {
          id
          possibleResponds
          required
          discarded
          question
          _modelApiKey
        }
      }
    }
  }
  `,
    {
      preview,
      variables: {
        slug,
      },
    }
  )
  return data
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    {
      allPosts(filter: {parent: {exists: "false"}}) {
        id
        titulek
        position
        slug
        thumbnailPicture {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 800, h: 400 }) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
  `,
    { preview }
  )
  return data?.allPosts
}

export async function getAllPostsForGroup(slug, preview) {
  const data = await fetchAPI(
    `
    {
      allPosts(filter: {parent: {exists: "false"}}) {
        id
        position
        slug
        titulek
        url
        thumbnailPicture {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 800, h: 400 }) {
            ...responsiveImageFragment
          }
          customData
        }
        content {
          ... on QuizblockRecord {
            id
            quizLink {
              _modelApiKey
              id
              slug
              title
            }
          }
          ... on LeadingTextRecord {
            _modelApiKey
            id
            text
          }
        }
        children {
          id
          slug
          titulek
          url
          content {
            ... on QuizblockRecord {
              id
              quizLink {
                id
                slug
                title
              }
            }
          }
        }
      }
    }
    ${responsiveImageFragment}
  `,
    { preview }
  )
  return data?.allPosts
}