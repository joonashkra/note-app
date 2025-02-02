export interface SvgButtonProps {
  size: number;
  color: string;
  navigate: (route: string) => void;
}

export type SvgProps = Omit<SvgButtonProps, "navigate">;
