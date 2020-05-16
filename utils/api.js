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
            prefilledGoogleFormsQuizUrl
          }
          description
          _modelApiKey
        }
        ... on LeadingTextRecord {
          id
          text(markdown: true)
          _modelApiKey
        }
      }
      ogImage: picture{
        url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
      }
      picture {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 500 }) {
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
      height
      slug
      title
      prefilledGoogleFormsQuizUrl
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
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
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
  `,
    { preview }
  )
  return data?.allPosts
}