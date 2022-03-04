import { useState } from "react";

export function useInput() {
  const [value, setValue] = useState("");
  function onChange({ target }) {
    setValue(target.value);
  }
  return { onChange, value };
}



/* export default useInput; */
