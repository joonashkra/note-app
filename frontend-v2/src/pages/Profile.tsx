
import GoBackButton from '../components/GoBackButton'
import ProfileContent from '../components/profile/ProfileContent'

export default function Profile() {
  return (
    <div className='profilePage'>
      <div id='GoBackBtn'>
        <GoBackButton />
      </div>
      <h1>Profile</h1>
      <ProfileContent />
    </div>
  )
}
