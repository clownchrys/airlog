import { createContext, useContext } from "react";

const Context = createContext({
  timeStamp: 1,
  timeString: "Some"
})

export default function Parent() {
  const value = useContext(Context);
  const onClick = () => {
    console.log("button clicked");
    const time = new Date();
    value.timeStamp = time.getTime();
    value.timeString = time.toTimeString();
  }
  return <Context.Provider value={ value }>
    <button onClick={ onClick }>Set Current!</button>
    <Child/>
  </Context.Provider>
}

function Child() {
  const { timeStamp, timeString } = useContext(Context);
  return <>
    <p>{ timeStamp }</p>
    <p>{ timeString }</p>
  </>
}
