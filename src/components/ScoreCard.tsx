type ScoreCardProps = {
  label: string;
  value: string;
};

export function ScoreCard({ label, value }: ScoreCardProps) {
  return (
    <div className="score-card">
      <span className="score-label">{label}</span>
      <strong className="score-value">{value}</strong>
    </div>
  );
}
