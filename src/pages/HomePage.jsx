import React from 'react'
import CardType1 from '../components/UI/CardType1'

const data = [
  {
    title: "Total conversations",
    metadata: 26,
  },
  {
    title: "Messages exchanged",
    metadata: 201,
  },
  {
    title: "Minutes spent on bot",
    metadata: 35,
  },
]

const HomePage = () => {
  return (
    <div className="px-4 py-12  flex  overflow-hidden flex-1">
      <div className='w-full h-full'
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 340px))",
          gap: "20px",
          justifyItems: "center",
          alignItems: "center",
          gridAutoRows: "minmax(220px, 240px)",
        }}
      >
        {data.map((dataObj) => (
          <CardType1>
            <div className='h-full flex flex-col justify-between p-4'>
              <h2 className='text-2xl text-tailorGrey-800'>{dataObj.title}</h2>
              <p className='text-6xl'>{dataObj.metadata}</p>
            </div>
          </CardType1>
        ))}
      </div>
    </div>
  )
}

export default HomePage