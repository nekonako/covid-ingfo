import Head from 'next/head'
import Axios from 'axios'
import dynamic from 'next/dynamic'
import * as React from 'react'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import useSWR from 'swr'

const Data = dynamic(
   () => import('../components/Data.js'),
   {ssr : false }
)

export default function Home({ allData, countries}) {
   function formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
   }

   const fetcher1 = url => countries.map((item) => {
      if(item.name != "Gambia") {
         return Axios.get(url+item.name)
            .then(res => Object.assign(res.data, { countries : item.name }))
            .catch(err => console.log(err))
      }
   })

   const h = useSWR('https://covid19.mathdro.id/api/countries/', fetcher1)
   const [k, setK] = React.useState([])

   React.useEffect(() => {
      Promise.all(h.data)
         .then(res => {
            setK(res)
         })
         .catch(err => console.log(err))
   }, [])

   console.log(k)
   if ( k.length < 1 ) return( 
   <div className='flex min-h-full justify-center items-center min-h-screen flex-row'>
      <div className='bg-secondary p-12 text-xl rounded-lg'>Loading sek cuk..</div>
   </div>
   )

      return (
         <div>
            <Navbar/>
            <div className='py-28'>
               <Layout>
                  <div className='grid grid-cols-1 text-dark w-full md:grid-cols-2 lg:grid-cols-4 text-center text-3xl font-bold gap-4'>
                     <div className='p-8 rounded-md bg-blue'>
                        <div className='text-base font-normal pb-2'> Negara Terjangkit </div>
                        {formatNumber(k.length)}
                     </div>
                     <div className='p-8 rounded-md bg-yellow'>
                        <div className='text-base font-normal pb-2'> Terkonfirmasi </div>
                        {formatNumber(allData.confirmed.value)}
                     </div>
                     <div className='p-8 rounded-md bg-green'>
                        <div className='text-base font-normal pb-2'> Sembuh </div>
                        {formatNumber(allData.recovered.value)}
                     </div>
                     <div className='p-8 rounded-md bg-red'>
                        <div className='text-base font-normal pb-2'>Meninggal</div>
                        {formatNumber(allData.deaths.value)}
                     </div>
                  </div>
                  <div className='mt-12 p-8 rounded-md bg-secondary'>
                     <div className='font-bold text-2xl mb-4'>Negara Terjangkit</div>
                     <table className='w-full'>
                        <thead className='font-bold'>
                           <tr className='pt-6 bg-primary'>
                              <td className='p-4' >Negara</td>
                              <td className='p-4'>Terkonfirmasi</td>
                              <td className='p-4' >Sembuh</td>
                              <td className='p-4'>Meninggal</td>
                           </tr>
                        </thead>
                        <tbody>
                           {k.map((item, index) => {
                              if(item != undefined) {
                                 return (
                                    <Data
                                    index={index}
                                    confirmed={formatNumber(item.confirmed.value)}
                                    recovered={formatNumber(item.recovered.value)}
                                    deaths={formatNumber(item.deaths.value)}
                                    countries={formatNumber(item.countries)}
                                 />
                                 )
                              }})}
                                 </tbody>
                              </table>
                           </div>
                        </Layout>
                     </div>
                  </div>
      )
}

export async function getServerSideProps() {
   try {
      const getAllData = await Axios.get('https://covid19.mathdro.id/api')
      const allData = getAllData.data
      let getCountries =  await Axios.get('https://covid19.mathdro.id/api/countries')
      let countries = getCountries.data.countries
      return { props : { allData,countries} }
   } catch(err){
      console.log(err)
      return { notFound : true }
   }
}
