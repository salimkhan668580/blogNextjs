import AdminLayout from "@/components/Layout/AdminLayout"


async function Layout({children}) {
   
    
  return (
    <AdminLayout>
        {children}
    </AdminLayout>
  )
}

export default Layout