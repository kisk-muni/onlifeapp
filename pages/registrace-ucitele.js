import SignInPage from '../components/auth/SignInPage'
import { withApollo } from '../apollo/client'

const features = [
  {
    heading: 'Kurz informační gramotnosti',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    heading: 'Kurz připravila Masarykova Univerzita',
    description: 'Odborníci z Masarykovy univerzity :-',
  },
  {
    heading: 'Výuka pod kontrolou',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    heading: 'Zpětná vazba',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    heading: 'Služba je zcela zdarma',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    heading: 'Podpora od autorů kurzu',
    description: 'Lorem ipsum dolor sit amet',
  },
]

const SignIn = () => <SignInPage
    features={features}
    logo="OnLife pro učitele"
    isForStudents={false}
    registerTeacher
    heading="Učte s námi informační gramotnost"
  />

export default withApollo(SignIn)