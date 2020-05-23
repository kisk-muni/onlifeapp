/** @jsx jsx */
import { Fragment } from 'react'
import { withApollo } from '../apollo/client'
import {GroupsList} from '../components/GroupsList'
import { CreateGroupDialog } from '../components/CreateGroupDialog'
import { jsx, Text, Heading, Grid, Flex, Box } from 'theme-ui'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import { DemoGroupBox, HelpBox } from "../components/HelpBox"
import FullPageLoading from "../components/FullPageLoading"
import Header from "../components/dashboard/Header"
import { NextPage } from 'next'
import { GroupsComponent } from '../apollo/groups.graphql'
import withAuthRedirect from '../utils/withAuthRedirect' 
import { NextSeo } from 'next-seo'

const GroupsOverview: NextPage = () => 
<Fragment>
  <NextSeo noindex title="Přehled tříd" />
  <GroupsComponent>
    {({ loading, error, data }) => {
      
      if (loading) {
        return <DashboardLayout
        header={<Header />}
        sx={{background: '#fafafa'}} 
        stickHeaderByDefault><FullPageLoading dashboard /></DashboardLayout>
      }

      // console.log({loading, error, data})
      
      if (data?.groups && data?.groups?.length > 0) {
        return <DashboardLayout
          header={<Header />}
          sx={{background: '#fafafa'}} 
          stickHeaderByDefault>
          <Flex sx={{flexWrap: 'wrap', overflow: 'display', background: '#fafafa'}}>
            <Box sx={{width: '100%'}}>
              <Box
                  sx={{maxWidth: 960, width: '100%'}}
                  px={35}
                  mt={60}
                  pb={120}
                  mx="auto">
                  <Heading as="h3" sx={{fontSize: 4, mb: 3, color: 'text'}}>Vaše třídy</Heading>
                  <Grid gap="3" columns={3}>
                    <CreateGroupDialog hasUserGroup={true} />
                    <GroupsList groups={data.groups} />
                  </Grid>
                </Box>
              </Box>
            </Flex>
          </DashboardLayout>
      } else {
        return <DashboardLayout
          header={<Header />}
          sx={{background: '#fafafa'}} 
          stickHeaderByDefault>
          <Flex sx={{
            flexWrap: "wrap", minHeight: "50vh"
          }}>
              <Box
                sx={{maxWidth: 1240}}
                px={35}
                pt={80}
                pb={120}
                mx="auto">
                <Heading sx={{color: 'text', mt: 5, fontWeight: 600, fontSize: 7}}>Vítejte v Onlife pro učitele!</Heading> 
                <Text sx={{color: 'text', fontSize: 4, my: 4, mb: 4}}>Mějte přehled o tom, jak si v kurzu vedou vaši studenti.</Text>
                <CreateGroupDialog hasUserGroup={false} />
              </Box>
            </Flex>
            <Flex sx={{
                flexWrap: 'wrap', width: "100%"
              }}>
              <Box
                sx={{width: '100%', maxWidth: 1240}}
                mx="auto"
                px={35}
                py={60}
              >
                <Grid gap="4" columns={[1/3, '1fr 2fr']}>
                  <DemoGroupBox/>
                  <HelpBox/>
                </Grid>
              </Box>
          </Flex>
        </DashboardLayout>
      }
    }}
  </GroupsComponent>
</Fragment>

export default withApollo(withAuthRedirect(GroupsOverview, {roles: ['teacher']}))