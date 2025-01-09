import { SvgButtonProps } from "../../../types/props";

const DashboardButton = ({ size, color }: SvgButtonProps) => (
  <svg
    className="authBarBtn"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={size}
    width={size}
    fill={color}
  >
    <path d="M3 8.976C3 4.055 4.055 3 8.976 3h6.048C19.945 3 21 4.055 21 8.976v6.048C21 19.945 19.945 21 15.024 21H8.976C4.055 21 3 19.945 3 15.024V8.976Z" />
  </svg>
);
export default DashboardButton;
