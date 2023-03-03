import { useState } from "react"

const useGenerateRandomColor = () => {
  const [color, setColor] = useState("")
  const generateColor = () => {
    setColor(Math.random().toString(16).substring(-6))
  }
  return {color, generateColor}
};

export default useGenerateRandomColor
