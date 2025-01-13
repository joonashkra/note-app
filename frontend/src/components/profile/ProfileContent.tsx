export default function ProfileContent() {
  return (
    <div className="profile">
      <div className="profileContent">
        <div className="profileContentContainer">
          <h2>Your Information</h2>
          <p>Name: TestUser</p>
          <p>Email: testUser@email.com</p>
          <p>Account created: 29/12/2024</p>
        </div>
        <div className="profileContentContainer">
          <h2>Your Connections</h2>
          <p>TestUser2</p>
          <p>TestUser3</p>
        </div>
        <div className="profileContentContainer">
          <h2>Settings</h2>
          <p>Change password</p>
          <p>Change email address</p>
          <p>Delete account</p>
        </div>
      </div>
    </div>
  );
}
