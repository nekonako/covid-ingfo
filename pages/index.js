import Head from 'next/head'
import Axios from 'axios'
import * as React from 'react'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'

export default function Home({ allData,countries}) {

   function formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
   }
   const [dataByCountries,setDataByCountries] = React.useState([])

   React.useEffect(() =>{
      let data = []
      countries.map((item) => {
         Axios.get('https://covid19.mathdro.id/api/countries/' + item.name)
            .then(res => {
               let k = res.data
               let j = { countries : item.name }
               let h = Object.assign(k, j)
               data.push(h)
            })
            .catch(err => {
               console.log(err)
            })
      })
      setDataByCountries(data)
      console.log(dataByCountries) 
   }, [])

   return (
      <div>
         <Navbar/>
         <div className='py-28'>
            <Layout>
               <div className='grid grid-cols-4 text-dark text-center text-3xl font-bold gap-4'>
                   <div className='p-8 rounded-md bg-blue'>
                     <div className='text-base font-normal pb-2'> Negara Terjangkit </div>
                     {formatNumber(countries.length)}
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
                  <div className='font-bold text-2xl mb-4'>Negara Terjangki</div>
                  <table className='table-auto min-w-full'>
                     <thead className='font-bold'>
                        <tr className='pt-6 bg-primary'>
                           <td className='p-4  border-b-2  border-gray-300 border-opacity-40' >Negara</td>
                           <td className='p-4  border-b-2  border-gray-300 border-opacity-40'>Terkonfirmasi</td>
                            <td className='p-4  border-b-2  border-gray-300 border-opacity-40' >Sembuh</td>
                           <td className='p-4  border-b-2  border-gray-300 border-opacity-40'>Meninggal</td>
                        </tr>
                     </thead>
                     <tbody className='text-base'>
                        {dataByCountries.map((item, index) => {
                           return(
                              <tr key={index}>
                                 <td  className='p-4'>
                                     <div className='flex flex-row  items-center'>
                                       <div className='h-3 w-3 rounded-full bg-blue mr-4'></div>
                                       <div>{item.countries.toUpperCase()}</div>
                                    </div>
                                 </td>
                                 <td className='p-4 border-b-2 border-gray-300 border-opacity-30 border-dashed'>
                                     <div className='flex flex-row  items-center'>
                                       <div className='h-3 w-3 rounded-full bg-yellow mr-4'></div>
                                       <div>{formatNumber(item.confirmed.value)}</div>
                                       </div>
                                 </td>
                                 <td className='p-4 border-b-2 border-gray-300 border-opacity-30 border-dashed'>
                                    <div className='flex flex-row  items-center'>
                                       <div className='h-3 w-3 rounded-full bg-green mr-4'></div>
                                       <div>{formatNumber(item.recovered.value)}</div>
                                    </div>
                                 </td>
                                 <td  className='p-4 border-b-2  border-gray-300 border-opacity-30 border-dashed'>
                                     <div className='flex flex-row  items-center'>
                                       <div className='h-3 w-3 rounded-full bg-red mr-4'></div>
                                       <div>{formatNumber(item.deaths.value)}</div>
                                    </div>
                                 </td>
                              </tr>
                           )
                        })
                        }
                           </tbody>
                        </table>
                     </div>
                  </Layout>
               </div>
            </div>
   )
}

export async function getStaticProps() {
   try {
      const getAllData = await Axios.get('https://covid19.mathdro.id/api')
      const allData = getAllData.data

      const getCountries =  await Axios.get('https://covid19.mathdro.id/api/countries')
      const countries = getCountries.data.countries

      return { props : { allData,countries, revalidate : 1} }
   } catch(err){
      console.log(err)
      return { notFound : true }
   }
}
