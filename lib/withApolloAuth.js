/** @jsx jsx */
import gql from 'graphql-tag'
import { Query } from 'react-apollo';
import LoadingBar from 'react-top-loading-bar';
import {Fragment} from 'react'
import { graphql } from '@apollo/react-hoc'
import { jsx } from 'theme-ui'

export const CURRENT_USER = gql`
query CurrentUser {
  user @client {
    isLoggedIn
    name
    photoURL
    email 
    id
  }
}
`

export const withAuth = graphql(CURRENT_USER)

export const withAuthPage = (WrappedComponent) => {
  class HOC extends React.Component {
    componentDidMount() {
      this.LoadingBar.continuousStart()
    }
    componentDidUpdate() {
      this.LoadingBar.continuousStart()
    }
    componentWillUnmount() {
      this.LoadingBar.complete()
    }
    render() {

      return (
        <Query query={CURRENT_USER}>
          {({loading, error, data}) => {
            let isLoggedIn = false
            if (!loading) {
              isLoggedIn = data.user.isLoggedIn
            }
          return <Fragment>
            <div sx={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100}}>
              <LoadingBar
                onRef={ref => (this.LoadingBar = ref)}
                height={3}
                color={loading ? '#000' : 'transparent'}
              />
            </div>
            <WrappedComponent
              {...this.props}
              loading={loading}
              error={error}
              isLoggedIn={isLoggedIn} 
            />
          </Fragment>  
        }} 
        </Query>
      );
    }
  }
    
  return HOC
};

export default withAuthPage