import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import { useState } from 'react'
import Modal from 'react-modal'
const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    data: null,
    type: 'add' // or 'edit'
  });

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
        </div>
      </div>

      <button className='absolute flex items-center justify-center w-16 h-16 rounded-2xl bg-primary hover:bg-blue-600 right-10 bottom-10' 
        onClick={  () => {
          setOpenAddEditModal({
            isShown: true,
            data: null,
            type: 'add'
          });
        }}>
          <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}  
          contentLabel=""
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto " 
      > 
        <AddEditNotes />
      </Modal>    
    </>
  )
}

export default Home