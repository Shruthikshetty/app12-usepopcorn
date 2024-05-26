import { useRef } from "react";
import { useKey } from "../../hooks/useKey";

//statefull component
export default function Search({ query, setQuery }: SearchProps) {
  const inputElement = useRef<HTMLInputElement>(null);

  /*   useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (document.activeElement === inputElement.current) return;
      if (e.code === "Enter") {
        inputElement.current?.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callback);

    //we can only acces the ref here since its only there after the dom has loaded
    //console.log(inputElement.current); 

    //  inputElement.current?.focus(); 

    return () => document.addEventListener("keydown", callback);
  }, [setQuery]); 
*/

  useKey("Enter", () => {
    if (document.activeElement === inputElement.current) return;
    inputElement.current?.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}

type SearchProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};
