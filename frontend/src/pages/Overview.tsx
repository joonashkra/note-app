export default function Overview() {
  const currFeatures = [
    "CRUDs for notes (minimum viable product)",
    "Authorization",
    "Routes",
    "App layout/structure",
  ];

  const futureFeatures = [
    "User connections",
    "Note collections",
    "Settings page",
    "Profile page",
  ];

  return (
    <div className="overviewPage">
      <div className="overviewPageContent">
        <h1>Overview</h1>
        <p>
          Here are listed the current (ready) features of the app and what's to
          come in the future. Also some screenshots of the app are included if
          creating an account seems like too much trouble.
        </p>
        <div className="overviewFeatures">
          <h2>Current features and development phases</h2>
          <ul>
            {currFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="overviewFeatures">
          <h2>Future features</h2>
          <ul>
            {futureFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <h2>Screenshots</h2>
        <div className="overviewImages">
          <img src="./public/dashboard.png" />
          <img src="./public/createnote.png" />
          <img src="./public/notedetails.png" />
        </div>
      </div>
    </div>
  );
}
