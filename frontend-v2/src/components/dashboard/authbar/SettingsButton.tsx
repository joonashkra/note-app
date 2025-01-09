import { SvgButtonProps } from "../../../types/props";

const SettingsButton = ({ size, color, navigate }: SvgButtonProps) => (
  <svg
    id="settingsBtn"
    className="authBarBtn"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    height={size}
    width={size}
    fill={color}
    onClick={() => navigate("/settings")}
  >
    <path d="m30.015 12.97-2.567-.569c-.2-.64-.462-1.252-.762-1.841l1.389-2.313c.518-.829.78-2.047 0-2.829L26.66 4.004c-.78-.781-2.098-.64-2.894-.088L21.515 5.35a11.976 11.976 0 0 0-1.829-.768l-.576-2.598C18.938 1.031 18.105 0 17 0h-2c-1.104 0-1.781 1.047-2 2l-.642 2.567a11.95 11.95 0 0 0-1.948.819l-2.308-1.47c-.795-.552-2.114-.692-2.894.088L3.793 5.418c-.781.782-.519 2 0 2.828l1.461 2.435a11.936 11.936 0 0 0-.705 1.72l-2.566.569c-.953.171-1.984 1.005-1.984 2.109v2c0 1.105 1.047 1.782 2 2l2.598.649c.179.551.404 1.08.658 1.593l-1.462 2.438c-.518.828-.78 2.047 0 2.828l1.415 1.414c.78.782 2.098.64 2.894.089l2.313-1.474a11.76 11.76 0 0 0 1.96.823l.64 2.559c.219.953.896 2 2 2h2c1.105 0 1.938-1.032 2.11-1.985l.577-2.604c.628-.203 1.23-.459 1.808-.758l2.256 1.438c.796.552 2.114.692 2.895-.089l1.415-1.414c.78-.782.518-2 0-2.828l-1.39-2.317c.279-.549.521-1.12.716-1.714l2.599-.649c.953-.219 2-.895 2-2v-2c0-1.104-1.031-1.938-1.985-2.11zm-.014 3.969a1.312 1.312 0 0 1-.448.192l-3.708.926-.344 1.051c-.155.474-.356.954-.597 1.428l-.502.986 1.959 3.267c.125.2.183.379.201.485l-1.316 1.314a1.549 1.549 0 0 1-.341-.14l-3.292-2.099-1.023.529a9.856 9.856 0 0 1-1.503.631l-1.09.352-.824 3.723c-.038.199-.145.36-.218.417h-1.8a1.295 1.295 0 0 1-.191-.448l-.921-3.681-1.066-.338a9.952 9.952 0 0 1-1.63-.684l-1.028-.543-3.293 2.099a.756.756 0 0 1-.409.143l-1.311-1.276a1.33 1.33 0 0 1 .181-.449l2.045-3.408-.487-.98a10.044 10.044 0 0 1-.547-1.325l-.343-1.052-3.671-.918a1.414 1.414 0 0 1-.485-.2v-1.86l.005.001c.034 0 .198-.117.335-.142l3.772-.835.346-1.103c.141-.449.333-.917.588-1.43l.487-.98-2.024-3.373a1.42 1.42 0 0 1-.201-.485L6.622 5.42c.128.041.271.093.34.14l3.354 2.138 1.027-.542a9.992 9.992 0 0 1 1.622-.682l1.063-.338.912-3.649c.053-.231.138-.398.2-.485h1.859c-.014.02.115.195.142.339l.84 3.794 1.089.352c.511.165 1.023.38 1.523.639l1.023.532 3.224-2.053a.748.748 0 0 1 .409-.143l1.313 1.276a1.304 1.304 0 0 1-.181.45l-1.98 3.296.505.988c.273.533.48 1.033.635 1.529l.346 1.104 3.697.82c.224.041.398.171.434.241zM16.013 9.99c-3.321 0-6.023 2.697-6.023 6.01s2.702 6.01 6.023 6.01 6.023-2.697 6.023-6.009c0-3.313-2.702-6.01-6.023-6.01zM16 20c-2.205 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" />
  </svg>
);
export default SettingsButton;
