"use client"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

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
