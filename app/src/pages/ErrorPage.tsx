import { Link } from "react-router-dom"

export default function ErrorPage() {
  return (
    <div className="flex flex-col gap-4 h-dvh items-center justify-center">
        <h1 className="text-3xl whitespace-nowrap">Error! Page Not Found.</h1>
        <Link to="/" className="text-xl hover:text-light/80">Go Back Home</Link>
    </div>
  )
}
