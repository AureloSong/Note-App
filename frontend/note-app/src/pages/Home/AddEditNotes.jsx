import React from 'react'
import { TagInput } from '../../components/Input/TagInput'
import { useState } from 'react'
const AddEditNotes = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);


  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input type="text"
        className='text-2xl outline-none text-slate-950'
        placeholder='Go to gym at 6'
        value={title}
        onChange={({target}) => setTitle(target.value)}
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
          onChange={({target}) => setContent(target.value)}
        />
      </div>
      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <button className='p-3 mt-5 font-medium btn-primary' onClick={() => {}}>
        Add
      </button> 
    </div>
  )
}

export default AddEditNotes