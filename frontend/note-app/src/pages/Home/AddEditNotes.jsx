import React from 'react'
import { TagInput } from '../../components/Input/TagInput'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'
const AddEditNotes = ({
  noteData,
  type,
  getAllNotes,
  onClose,
  showToastMessage }) => {

  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState('');

  const addNewNote = async () => {
    try{
      const response = await axiosInstance.post("/add-note",{
        title,
        content,
        tags,
      })

      if (response.data && response.data.note){
        showToastMessage("Note Added Successfully")
        getAllNotes()
        onClose()
      }
    }catch(error){
      if(error.response && error.response.data && error.response.message){
        setError(error.response.message)
      }
    }
  }
  //edit Note
  const editNote = async () => {
    try{
      const noteId= noteData._id
      const response = await axiosInstance.put("/edit-note/"+ noteId,{
        title,
        content,
        tags,
      })

      if (response.data && response.data.note){
        showToastMessage("Note Updated Successfully")
        getAllNotes()
        onClose()
      }
    }catch(error){
      if(error.response && error.response.data && error.response.message){
        setError(error.response.message)
      }
    }
  }
  //handle Add Note
  const handleAddNote = () => {
    if (!title) {
      setError('Title is required');
      return;
    }
    if (!content) {
      setError('Content is required');
      return;
    }
    setError("")

    if (type === 'edit') {
      editNote()
    } else {
      addNewNote()
    }
  }

  return (
    <div className='relative'>

      <button className='absolute flex items-center justify-center w-10 h-10 rounded-full right-3 top-3 hover:bg-slate-500'
        onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
      </button>

      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input type="text"
          className='text-2xl outline-none text-slate-950'
          placeholder='Go to gym at 6'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea
          type="text"
          className='p-2 text-sm rounded outline-none text-slate-950 bg-slate-50 '
          placeholder='content goes here...'
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className='pt-4 text-xs text-red-500'>{error}</p>}

      <button className='p-3 mt-5 font-medium btn-primary' onClick={handleAddNote}>
        {type === "edit" ?  "UPDATE":"Add"}
      </button>
    </div>
  )
}

export default AddEditNotes