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
    state = {
      progress: 10
    };
    interval = 0

    componentDidMount() {
      this.interval = setInterval(() => {
        if (this.interval < 90) {
          this.setState({ progress: this.state.progress + 21})
        }
      }, 200)
    }
    componentWillUnmount() {
      clearInterval(this.interval)
    }

    render() {
      return (
        <Query query={CURRENT_USER}>
          {({loading, error, data}) => {
            let isLoggedIn = false
            let progress = this.state.progress
            if (!loading) {
              isLoggedIn = data.user.isLoggedIn
              progress = 100
            }
          return <Fragment>
            <div sx={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100}}>
              <LoadingBar
                progress={progress}
                height={3}
                color={loading ? '#000' : 'transparent'}
                className='bar'
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