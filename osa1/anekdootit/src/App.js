
import { useEffect, useState } from "react"

const a = async () => {
  return 2
}

const App = () => {
  const v = true
  if (!v) {
    console.log("pasdjka")
  } else {
    a.then({console.log("moro")}).catch()
  }
}

export default App