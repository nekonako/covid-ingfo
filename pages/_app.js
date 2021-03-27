import '../styles/globals.css'
import { ThemeProvider } from '../components/ThemeContext'

function MyApp({ Component, pageProps }) {
return (
<ThemeProvider>
<div className='w-full min-h-screen text-base antialiased bg-primary text-primary'>
   <Component {...pageProps} />
</div>
</ThemeProvider>
)}

export default MyApp
