import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import { useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import Toast from "../../components/ToastMessage/Toast"
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import noteImg from "../../assets/images/noteImg.svg"
import noResSearch from "../../assets/images/no-search-results.svg"

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    data: null,
    type: 'add'
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  })

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      data: noteDetails,
      type: "edit"
    })
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    })
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    })
  }

  //get userInfo
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  //get-all-notes 
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes")
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }

  }

  //Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId)
      if (response.data && !response.data.error) {
        getAllNotes();
        showToastMessage("Note Deleted Successfully", "delete");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.message) {
        console.log("An unexpected error occured. Please try again.")
      }
    }
  }

  //Search notes
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query }
      })

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateIsPinned = async (noteData) =>{
    try{
      const noteId= noteData._id
      const response = await axiosInstance.put("/update-note-pinned/"+ noteId,{
      })

      if (response.data && response.data.note){
        showToastMessage("Pin Updated Successfully")
        getAllNotes()
        onClose()
      }
    }catch(error){
      if(error.response && error.response.data && error.response.message){
        setError(error.response.message)
      }
    }
  }

  const handleCleanSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => { }
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleCleanSearch={handleCleanSearch} />

      <div className='container mx-auto'>
        {allNotes.length > 0 ? (<div className='grid grid-cols-3 gap-4 mt-8'>
          {allNotes.map((note, index) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={note.createdOn}
              content={note.content}
              tags={note.tags.map(tag => `#${tag}`).join(", ")}
              isPinned={note.isPinned}
              onEdit={() => handleEdit(note)}
              onDelete={() => deleteNote(note)}
              onPinNote={() => {updateIsPinned(note)}}
            />))}

        </div>) : (
          <EmptyCard imgSrc={isSearch 
            ? noResSearch 
            : noteImg}
            message={isSearch 
              ? "No results for this search."
              : "Start creating your own Notes..."}
          />

        )}
      </div>

      <button className='absolute flex items-center justify-center w-16 h-16 rounded-2xl bg-primary hover:bg-blue-600 right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            data: null,
            type: 'add'
          });
        }}>
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        ariaHideApp={false}
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto "
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              data: null,
              type: 'add'
            });

          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />

    </>
  )
}

export default Home