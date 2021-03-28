export default function Data({countries, confirmed, recovered, deaths, index }){
   return (
      <tr key={index}>
         <td  className='p-4 border-b-2 border-gray-300 border-opacity-30 border-dashed'>
            <div className='flex flex-row  items-center'>
               <div className='h-3 w-3 rounded-full bg-blue mr-4'></div>
               <div>{countries}</div>
            </div>
         </td>
         <td className='p-4 border-b-2 border-gray-300 border-opacity-30 border-dashed'>
            <div className='flex flex-row  items-center'>
               <div className='h-3 w-3 rounded-full bg-yellow mr-4'></div>
               <div>{confirmed}</div>
            </div>
         </td>
         <td className='p-4 border-b-2 border-gray-300 border-opacity-30 border-dashed'>
            <div className='flex flex-row  items-center'>
               <div className='h-3 w-3 rounded-full bg-green mr-4'></div>
               <div>{recovered}</div>
            </div>
         </td>
         <td  className='p-4 border-b-2  border-gray-300 border-opacity-30 border-dashed'>
            <div className='flex flex-row  items-center'>
               <div className='h-3 w-3 rounded-full bg-red mr-4'></div>
               <div>{deaths}</div>
            </div>
         </td>
      </tr>
   )
}
