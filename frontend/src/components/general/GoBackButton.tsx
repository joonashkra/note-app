import { useNavigate } from "react-router-dom";

interface GoBackButtonProps {
  text: string;
  route: string | number;
}

export default function GoBackButton({ text, route }: GoBackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        if (typeof route === "number") {
          navigate(route);
        } else {
          navigate(route);
        }
      }}
      type="button"
      id="goBackBtn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        height={20}
        width={20}
        className="buttonSvg"
      >
        <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
        <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
      </svg>
      {text}
    </button>
  );
}
