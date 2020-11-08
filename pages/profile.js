// This import is only needed when checking authentication status directly from getInitialProps
// import auth0 from '../lib/auth0'
import useUser from 'data/useUser'

function ProfileCard({ user }) {
  return (
    <>
      <h1>Profile</h1>

      <div>
        <h3>Profile (client rendered)</h3>
        <img src={user.picture} alt="user picture" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div>
    </>
  )
}

function Profile() {
  const { user, loading, error } = useUser()
  if (loading) {
    return (
      <div>loading...</div>
    )
  }
  if (user?.error || error) {
    return (
      <div>error</div>
    )
  }
  return (
    <div>
      <ProfileCard user={user} />
      <code>
        {JSON.stringify(user)}
      </code>
    </div>
  )
}

export default Profile