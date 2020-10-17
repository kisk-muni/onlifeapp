/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { CreateGroupDialog } from '../components/CreateGroupDialog'
import { jsx, Text, Heading, Grid, Flex, Container, Box } from 'theme-ui'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import { DemoGroupBox, HelpBox } from "../components/HelpBox"
import FullPageLoading from "../components/FullPageLoading"
import Header from "../components/Header"
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import { Response } from './api/groups'

const Groups = () => {
  const { data, error } = useSWR<Response>('/api/groups', fetcher)
  if (error) return <div>Něco se pokazilo :(</div>
  if (!data) return <FullPageLoading dashboard /> 
  if (data.length === 0) 
      <Fragment>
        <Container>
          <Heading sx={{color: 'text', mt: 5, fontWeight: 600, fontSize: 7}}>Vítejte v Onlife pro učitele!</Heading> 
          <Text sx={{color: 'text', fontSize: 4, my: 4, mb: 4}}>Mějte přehled o tom, jak si v kurzu vedou vaši studenti.</Text>
          <CreateGroupDialog hasUserGroup={false} />
        </Container>
        <Container>
          <Grid gap="4" columns={[1/3, '1fr 2fr']}>
            <DemoGroupBox/>
            <HelpBox/>
          </Grid>
        </Container>
      </Fragment>
  return <Container>
    <Heading as="h3" sx={{fontSize: 4, mb: 3, mt: 4, color: 'text'}}>Vaše třídy</Heading>
    <Grid gap="3" columns={3}>
      <CreateGroupDialog hasUserGroup={true} />
      {
        data?.map(group => (
          <Link key={group.id} href={"/trida?trida="+group.id}>
            <Box
              key={group.id}
              sx={{variant: 'styles.groupListItem',  }}
            >
              <Heading as="h3" sx={{fontSize: 5}}>
                {group.name}
              </Heading>
            </Box>
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
      sx={{background: '#fafafa'}} 
      stickHeaderByDefault
    >
      <Groups />
    </DashboardLayout>
  </Fragment>

export default GroupsPage