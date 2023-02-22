import { useNavigate, useParams, Link} from "react-router-dom";
import {useEffect, useState} from 'react';
import { usePosts } from "../context/postContext"
import {Formik, Form, Field, ErrorMessage }from 'formik'
import * as Yup from 'yup';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export function PostForm() {
  
  const {createPost, getPost, updatePost} = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: '',
    description: '',
    image: null,
  })

  useEffect(() => {
    (async ()=> {
      if(params.id){
        const data = await getPost(params.id)
        setPost(data)
        } 
    })();
  }, [params.id])

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4" >
        <h3 className="text-xl text-white" >New Post</h3>
        <Link to='/' className="text-gray-400 text-sm hover:text-gray-300" >Go back</Link>
        </header>
      <Formik initialValues={post}
      validationSchema={
        Yup.object({
          title: Yup.string().required('Title is required'),
          description: Yup.string().required('Description is required'),
        })
      }
      onSubmit={async (values, actions) => {
        console.log(values)
        if(params.id){
          await updatePost(params.id, values)
          navigate('/')
        }else{
          await createPost(values)
          actions.setSubmitting(false);
        navigate('/')
        }
      }}
      enableReinitialize
      >
        {({handleSubmit, setFieldValue, isSubmitting})=>(
          <Form onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-sm block font-bold text-gray-400">Title</label> 
          <Field name='title' placeholder="Title" 
          className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" />
          <ErrorMessage component="p" className="text-red-400 text-sm" name="title"/>
          <label htmlFor="description" className="text-sm block font-bold text-gray-400">Description</label> 
          <Field name='description' placeholder="Description" component="textarea"
          className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"/>
          <ErrorMessage component="p" className="text-red-400 text-sm" name="description"/>
          <label htmlFor="title" className="text-sm block font-bold text-gray-400">Image</label>
          <input type="file" name="image" className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" 
          onChange={(e)=> setFieldValue('image', e.target.files[0])}/>
          <button type="submit" 
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none
          disabled:bg-indigo-400" disabled={isSubmitting}>{isSubmitting ? (
            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5"/>
          ) 
          : 'Save'}</button>
        </Form>
        )}
      </Formik>
      </div>
    </div>
  )
}

export default PostForm