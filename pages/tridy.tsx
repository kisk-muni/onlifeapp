/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { CreateGroupDialog } from 'components/CreateGroupDialog'
import { jsx, Text, Heading, Grid, Container, Flex, Card } from 'theme-ui'
import DashboardLayout from 'components/dashboard/DashboardLayout'
import FullPageLoading from "components/FullPageLoading"
import Header from "components/Header"
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import fetcher from 'lib/fetcher'
import { Response } from 'pages/api/groups'

const Groups = () => {
  const { data, error } = useSWR<Response>('/api/groups', fetcher)
  if (error) return <Container>
    <Text sx={{color: 'red'}}></Text>
  </Container>
  if (!data) return <FullPageLoading dashboard /> 
  if (data.length == 0) return <Fragment>
      <Container>
        <Flex sx={{flexDirection: 'column', alignItems: 'center'}}>
          <Heading variant="ultratitle" sx={{mt: 5, textAlign: 'center'}}>Vítejte v Onlife pro učitele!</Heading> 
          <Text variant="subtitle" sx={{color: 'text', textAlign: 'center', my: 4, mb: 4}}>Mějte přehled o tom, jak si v kurzu vedou vaši studenti.</Text>
          <CreateGroupDialog hasUserGroup={false} />
        </Flex>
      </Container>
    </Fragment>
  return <Container>
    <Heading as="h3" sx={{fontSize: 4, mb: 3, mt: 4, color: 'text'}}>Vaše třídy</Heading>
    <Grid gap="32px" columns={[2, 3, 4]}>
      <CreateGroupDialog hasUserGroup={true} />
      {
        data?.map(group => (
          <Link key={group.id} href={"/aktivita?trida="+group.id}>
            <Card
              key={group.id}
              variant="interactive"
              sx={{
                height: 210,
                ":hover,:focus": {
                  cursor: "pointer",
                }
              }}
            >
              <Heading as="h2">
                {group.name}
              </Heading>
            </Card>
          </Link>
        ))
      }
    </Grid>
  </Container>
}

const GroupsPage: NextPage = () => <Fragment>
    <NextSeo noindex title="Přehled tříd" />
    <DashboardLayout
      header={<Header />}
      sx={{bg: 'sheet'}} 
      stickHeaderByDefault
    >
      <Groups />
    </DashboardLayout>
  </Fragment>

export default GroupsPage