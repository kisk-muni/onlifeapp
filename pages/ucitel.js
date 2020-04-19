/** @jsx jsx */
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { withApollo } from '../apollo/client'
import { Query } from 'react-apollo';
import {GroupsList} from '../components/GroupsList'
import { CreateGroupDialog } from '../components/CreateGroupDialog'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading, Grid } from 'theme-ui'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import { DemoGroupBox, HelpBox } from "../components/HelpBox";
import FullPageLoading from "../components/FullPageLoading";
import Header from "../components/Header";

const GET_GROUPS = gql`
  query Groups {
    groups {
      id
      name
      color
    }
  }
`;

const UserIndex = () => 
<Query query={GET_GROUPS}>
  {({ loading, error, data }) => {
    
    if (loading) {
      return <FullPageLoading />
    }

    console.log({loading, error, data})

    if (data?.groups?.length > 0) {
      return <DashboardLayout
        header={<Header />}
        sx={{background: '#fafafa'}} 
        stickHeaderByDefault>
        <Flex flexWrap="wrap" sx={{overflow: 'display', background: '#fafafa'}}>
          <Box width="100%">
            <Box
                maxWidth={960}
                px={35}
                mt={60}
                pb={120}
                width={[1, 5/6]}
                mx="auto">
                <Heading as="h3" sx={{fontSize: 4, mb: 1, color: 'text'}}>Vaše třídy</Heading>
                <Grid gap="3" columns={3}>
                  <CreateGroupDialog hasUserGroup={true} />
                  <GroupsList groups={data.groups} />
                </Grid>
              </Box>
            </Box>
          </Flex>
        </DashboardLayout>
    } else {
      return <DashboardLayout stickHeaderByDefault header={<Header />}>
        <Flex flexWrap="wrap" minHeight="50vh">
            <Box
              maxWidth={1240}
              px={35}
              pt={80}
              pb={120}
              width={[1, 5/6]}
              mx="auto">
              <Heading sx={{color: 'text', mt: 5, fontWeight: 600, fontSize: 7}}>Vítejte v Onlife pro učitele!</Heading> 
              <Text sx={{color: 'text', fontSize: 4, my: 4, mb: 4}}>Mějte přehled o tom, jak si v kurzu vedou vaši studenti.</Text>
              <CreateGroupDialog />
            </Box>
          </Flex>
          <Flex flexWrap='wrap' width="100%">
            <Box
              width={[1, 5/6]}
              maxWidth={1240}
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
</Query>

export default withApollo(UserIndex)