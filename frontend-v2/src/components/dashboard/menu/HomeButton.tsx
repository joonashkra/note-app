import { SvgButtonProps } from "../../../types/props";

const HomeButton = ({ size, color, navigate }: SvgButtonProps) => (
  <svg
    className="menuBarBtn"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    height={size}
    width={size}
    fill="#000000"
    onClick={() => navigate("/dashboard")}
  >
    <path d="m30.488 13.431-14-12c-.13-.112-.301-.18-.488-.18s-.358.068-.489.181l.001-.001-14 12A.747.747 0 0 0 1.25 14v16c0 .414.336.75.75.75h28a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.261-.569l-.001-.001zM11.75 29.25V24a4.25 4.25 0 0 1 8.5 0v5.25zm17.5 0h-7.5V24a5.75 5.75 0 1 0-11.5 0v5.25h-7.5V14.345L16 2.989l13.25 11.356z" />
  </svg>
);
export default HomeButton;
