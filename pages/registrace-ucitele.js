import SignInPage from '../components/auth/SignInPage'
import { withApollo } from '../apollo/client'

const features = [
  {
    heading: 'Výuka pod kontrolou',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    heading: 'Zpětná vazba',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    heading: 'Kurz je zcela zdarma',
    description: 'Lorem ipsum dolor sit amet',
  }
]

const SignIn = () => <SignInPage
    features={features}
    logo="OnLife pro učitele"
    isForStudents={false}
    registerTeacher
    heading="Učte s námi informační gramotnost"
  />

export default withApollo(SignIn)