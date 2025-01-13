import { SvgProps } from "../types/props";

export default function Check({ size, color }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 24 24"
      height={size}
      width={size}
    >
      <path d="M9 18.25a.74.74 0 0 1-.53-.25l-5-5a.75.75 0 1 1 1.06-1L9 16.44 19.47 6a.75.75 0 0 1 1.06 1l-11 11a.74.74 0 0 1-.53.25Z" />
    </svg>
  );
}
