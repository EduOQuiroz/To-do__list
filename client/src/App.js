import { HomePage, PostForm, NotFound} from "./pages";
import { Routes, Route} from 'react-router-dom'
import './index.css'
import { PostProvider } from "./context/postContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className='bg-neutral-900 min-h-screen'>
    <div className='px-10 container pt-40'>
      <PostProvider>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/new" element={<PostForm/>} />
          <Route path="/post/:id" element={<PostForm/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Toaster />
      </PostProvider>
      
    </div>  
    </div>
  );
}

export default App;