import { useState } from "react";
import MovieList from "./MovieList";

type ListBoxProps = {
  children?: React.ReactNode;
};

//statefull component
export default function Box({ children }: ListBoxProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
