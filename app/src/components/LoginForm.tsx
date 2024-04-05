export default function LoginForm() {
  return (
    <div className="flex flex-col w-max">
        <input className="mb-4 p-2" placeholder="Email..."/>
        <input className="mb-4 p-2" placeholder="Password..."/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button> 
    </div>
  )
}