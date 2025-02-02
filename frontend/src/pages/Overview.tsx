export default function Overview() {
  const currFeatures = [
    "CRUDs for notes",
    "CRUDs for collections",
    "Handling actions between notes and collections",
    "User authentication and authorization",
    "Overall app layout/structure",
  ];

  const futureFeatures = ["User connections", "Settings page", "Profile page"];

  return (
    <main className="overviewPage">
      <section>
        <h1>Overview</h1>
        <p>
          Here are listed the current (ready) features of the app and what's to
          come in the future.
        </p>
      </section>
      <section className="overviewFeatures">
        <div>
          <h2>Current features and development phases</h2>
          <ul>
            {currFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Future features</h2>
          <ul>
            {futureFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
