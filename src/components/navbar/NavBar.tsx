import Logo from "./Logo";

type navBarProps = {
  children?: React.ReactNode;
};

export default function NavBar({ children }: navBarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
