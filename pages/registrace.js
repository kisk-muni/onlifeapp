import SignInPage from '../components/auth/SignInPage'

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
  isForStudents
  logo="OnLife"
  heading="Studujte s námi informační gramotnost"
/>

export default SignIn