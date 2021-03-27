import Link from 'next/link'
import * as React from 'react'
import { ThemeContext } from '../components/ThemeContext'
import Layout from '../components/Layout.js'

export default function Navbar() {

const { theme, setTheme } = React.useContext(ThemeContext)
const [toggle, setToggle] = React.useState()
const [mode, setMode] = React.useState()

React.useEffect(() => {
if (theme == "light") {
setToggle(<div  className='bg-primary py-1 px-2 rounded-md'>Night</div>)
         setMode("Light")
   } else {
         setToggle(<div  className='bg-primary py-1 px-2 rounded-md'>Light</div>)
         setMode("Dark")
      }
   },[theme])


   const togg = () => {
      setTheme(theme == "dark" ? "light" : "dark")
      console.log(theme)
      if (theme == "dark") {
         setToggle(<div>Light</div>)
         setMode("Dark")
      } else {
         setToggle(<div>Dark</div>)
         setMode("Light")
      }
   }

   return(
      <>
         <div className='fixed z-10 w-full py-4 bg-secondary md:py-5'>
            <Layout>
               <div className='flex flex-row items-center justify-between'>
                  <Link href='/'>
                     <div className='font-bold text-3xl'>
                        <span className="text-red ">Covid19</span>Info
                     </div>
                  </Link>
                  <button className='ml-12 focus:outline-none' onClick={togg}>{toggle}</button>
               </div>
            </Layout>
         </div>
   </>
   )
}
