import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
const Home = () => {
  return (
    <>
      <Navbar />

      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <NoteCard title="Meeting on 21st October"
            date="21st October 2023"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            tags={['work', 'meeting']}
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />
          
          <button className='flex items-center justify-center w-16 h-16 rounded-2xl bg-primary hover:bg-blue-600 right-10 bottom-10' onClick={  () => {}}>
            <MdAdd className='text-[32px] text-white' />
          </button>

          
        </div>
      </div>
    </>
  )
}

export default Home