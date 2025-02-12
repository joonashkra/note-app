import { SvgProps } from "../../types/props";

interface NotFoundProps extends SvgProps {
  text: string;
}

const NotFound = ({ size, text }: NotFoundProps) => (
  <div className="notFound">
    <p>{text}</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-20 0 190 190"
      width={size}
      height={size}
      id="notFoundSvg"
    >
      <path
        fillRule="evenodd"
        d="m38.155 140.475 10.833-78.364 43.881 4.946 18.568 23.955-8.041 57.109-65.241-7.646Zm45.858-46.473 4.814-22.195-34.781-3.5-9.854 67.15 54.143 6.627 6.542-45.275-20.864-2.807Zm-24.242 29.593c-.377-.496-3.721-3.296-4.35-4.162 8.899-9.911 30.629-9.788 36.664 3.324-1.005.371-5.495 2.315-6.375 2.81-2.518-7.317-17.265-9.625-25.939-1.972Zm16.732-27.096-3.666 2.76-5.515-6.642-7.507 4.03-3.029-5.07 6.829-3.426-4.526-5.452 5.5-3.68 4.39 6.439 7.819-3.925 2.356 4.73-7.047 3.784 4.396 6.452Z"
        clipRule="evenodd"
      />
    </svg>
  </div>
);
export default NotFound;
