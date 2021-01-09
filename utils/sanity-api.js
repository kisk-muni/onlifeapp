import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'qi9dlonx',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: true // `false` if you want to ensure fresh data
})

export async function getMainTopics() {
  const query = "*[_type == 'topic' && count(children) != 0] {...}"
  const params = {minSeats: 2}
  return (await client.fetch(query, params))
}
