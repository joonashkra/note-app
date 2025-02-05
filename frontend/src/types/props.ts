export interface SvgButtonProps {
  size: number;
  navigate: (route: string) => void;
}

export type SvgProps = Omit<SvgButtonProps, "navigate">;
