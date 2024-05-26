import { useEffect } from "react";

/** 
* This hook sets up an event listener for a specific key press and executes a given function when that key is pressed.
* @param key (string): The key to listen for.
* @param action (function): The function to execute when the specified key is pressed.
* @field Usage:
Call useKey with the desired key and the function to be executed.
When the specified key is pressed, the provided function (action) will be called.
* Cleanup:
The hook removes the event listener when the component unmounts to avoid memory leaks.
*/

export function useKey(key: string, action: () => void): void {
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
        console.log("Closing");
      }
    }
    document.addEventListener("keydown", callback);

    // cleaning up
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]); // why?
}
