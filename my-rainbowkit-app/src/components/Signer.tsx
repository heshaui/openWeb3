import { useState } from "react"
import { useSignMessage } from "wagmi"


const SignMessage = () => {
  const { signMessageAsync } = useSignMessage()
  const [signature, setSignature] = useState('')
  const handleSign = async () => {
    try {
      const res = await signMessageAsync({ message: 'hello world' })
      console.log(res, 'res')
      setSignature(res)
    } catch (error) {
      console.log(error, 'error')
    }
  }
  return <div>
    <button
      onClick={handleSign}
    >sign 'hello world'</button>
    <p>signedMessage: {signature}</p>
  </div>
}

export default SignMessage