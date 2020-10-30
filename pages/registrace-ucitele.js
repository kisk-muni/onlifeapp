import { Fragment } from 'react'
import SignInPage from 'components/auth/SignInPage'
import { NextSeo } from 'next-seo'

const features = [
  {
    heading: 'Spravujte třídy',
    description: 'Založte třídu a pozvěvěte do ní žáky.',
  },
  {
    heading: 'Přehled o aktivitě třídy',
    description: 'Sledujte, jak se žákům daří v jednotlivých tématech.',
  },
  {
    heading: 'Materiály na jednom místě',
    description: 'Získejte ucelený přehled kurzu se všemi materiály na jednom místě.'
  }
]

const SignIn = () => (
  <Fragment>
    <NextSeo title="Registrace učitele" />
    <SignInPage
      features={features}
      logo="ONLIFE pro učitele"
      isForStudents={false}
      registerTeacher
      heading="Učte s námi informační gramotnost"
    />
  </Fragment>
  )

export default SignIn