interface WorkInProgressProps {
  description: string;
}

export default function WorkInProgress({ description }: WorkInProgressProps) {
  return (
    <div className="workInProgress">
      <h1>Sorry, this feature doesn't exist yet...</h1>
      <div>
        <h2>But here's an quick overview of what it might be in the future:</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
