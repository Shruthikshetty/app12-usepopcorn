export default function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
}