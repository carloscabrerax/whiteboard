"use client"
import io from "socket.io-client"

const socket = io(process.env.NEXT_PUBLIC_API_URL as string)

export default function Message() {
  function handleClick() {
    // console.log('hello')
    socket.emit("send_message", { message: "hello" })
  }
  return (
    <div className='flex gap-2 m-2 items-center'>
      <input type="text" placeholder="Message" className='p-2' />
      <button className='bg-white p-2' onClick={handleClick}>click here</button>
    </div>
  )
}
