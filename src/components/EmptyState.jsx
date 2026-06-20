
export default function EmptyState({ icon, title, text }) {
  return (
    <div className="empty-state">
      <div className="emoji">{icon}</div>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  );
}
