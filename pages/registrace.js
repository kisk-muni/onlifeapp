import { Fragment } from 'react'
import SignInPage from '../components/auth/SignInPage'
import { withApollo } from '../apollo/client'
import { NextSeo } from 'next-seo'

const features = [
  {
    heading: 'Zpětná vazba',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    heading: 'Kurz je zcela zdarma',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    heading: 'Podpora od autorů kurzu',
    description: 'Lorem ipsum dolor sit amet',
  },
]

const SignIn = () => 
  <Fragment>
    <NextSeo title="Registrace" />
    <SignInPage
      features={features}
      isForStudents
      logo="OnLife"
      heading="Studujte s námi informační gramotnost"
    />
  </Fragment>

export default withApollo(SignIn)