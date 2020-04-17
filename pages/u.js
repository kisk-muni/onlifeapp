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
import StarterLayout from '../components/StarterLayout'
import { DemoGroupBox, HelpBox } from "../components/HelpBox";
import FullPageLoading from "../components/FullPageLoading";

const GET_GROUPS = gql`
  query Groups {
    groups {
      id
      name
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
      return <StarterLayout>
        <Flex flexWrap="wrap" sx={{variant: 'styles.decoratedBox', overflow: 'display', background: 'transparent'}}>
          <div sx={{variant: 'styles.decoratedOverlay', maxHeight: '300px'}}></div>
          <div sx={{
            variant: 'styles.createclassIllustration',
            backgroundImage: 'none',
            maxHeight: '300px',
            left: 0
            }}></div>
          <Box width="100%">
            <Box
                sx={{ variant: 'styles.decoratedcontent' }}
                maxWidth={960}
                px={35}
                mt={170}
                pb={120}
                width={[1, 5/6]}
                mx="auto">
                <Heading as="h3" sx={{fontSize: 3, color: '#fff'}}>Třídy</Heading>
                <Grid gap="3" columns={3}>
                  { /* <CreateGroupDialog uid={data.user.id} hasUserGroup={true} /> */}
                  <GroupsList groups={data.groups} />
                </Grid>
              </Box>
            </Box>
          </Flex>
        </StarterLayout>
    } else {
      return <StarterLayout>
        <Flex flexWrap="wrap" minHeight="50vh" sx={{variant: 'styles.decoratedBox'}}>
          <div sx={{variant: 'styles.decoratedOverlay'}}></div>
          <div sx={{variant: 'styles.createclassIllustration'}}></div>
            <Box
              sx={{ variant: 'styles.decoratedcontent' }}
              maxWidth={1240}
              px={35}
              pt={80}
              pb={120}
              width={[1, 5/6]}
              mx="auto">
              <Heading sx={{color: 'background', mt: 5, fontWeight: 600, fontSize: 6}}>Vítejte v Onlife pro učitele!</Heading> 
              <Text sx={{color: 'background', fontSize: 2, my: 4, mb: 4}}>Mějte přehled o tom, jak si v kurzu vedou vaši studenti.</Text>
              { /* <CreateGroupDialog uid={data.user.id} /> */ }
            </Box>
          </Flex>
          <Flex backgroundColor="#f6f6f6" flexWrap='wrap' width="100%">
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
      </StarterLayout>
    }
  }}
</Query>

export default withApollo(UserIndex)