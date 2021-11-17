import React, { RefObject, useRef } from "react";

function Parent() {
  const ref = useRef<HTMLInputElement>(null);
  return <div>
    <input ref={ ref }/>
    <Child forwardedRef={ ref }/>
  </div>
}

type ChildProps = {
  forwardedRef?: RefObject<HTMLInputElement>
}
function Child({ forwardedRef }: ChildProps) {
  const onClick = () => alert(forwardedRef?.current?.value);
  return <button onClick={ onClick }>BUTTON</button>
}

export default Parent;