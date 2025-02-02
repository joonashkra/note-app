interface ErrorMessageProps {
  text: string;
}

export default function ErrorMessage({ text }: ErrorMessageProps) {
  if (text === null) return null;

  return <p className="errorMsg">{text}</p>;
}
