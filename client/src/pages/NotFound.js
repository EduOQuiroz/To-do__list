import { usePosts } from "../context/postContext"
export function NotFound() {
  const myContext = usePosts()
    console.log(myContext)
  return (
    <div>NotFound</div>
  )
}

export default NotFound