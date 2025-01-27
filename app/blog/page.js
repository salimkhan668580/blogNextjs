import Blog from '../../components/Blog'

export const metadata = {
  title: 'Blog',
  description: 'Blog page of Next.js',
  keywords: ['next.js', 'blog']
}

async function BlogRoute() {

  const data = await fetch(`${process.env.BASE_URL}/api/blog`)
  const blog = await data.json()
  
    return <Blog data={blog}/>; 
  } 


export default BlogRoute;
