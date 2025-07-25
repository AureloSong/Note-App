import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'
import moment from 'moment'
const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return (
        <div className='p-4 transition-all ease-in-out bg-white border rounded hover:shadow-xl'>
            <div className='flex items-center justify-between gap-2'>
                <div>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-sm text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>
                </div>
                <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={onPinNote}
                />
            </div>
            <p className='mt-2 text-xs text-slate-600'>{content?.slice(0, 60)}</p>
            <div className=''>
                <div className='text-xs text-slate-500'>{tags}</div>
            </div>
            <div className='flex items-center justify-between mt-2'>
                <div className='text-xs text-slate-500'></div>
                <div className='flex items-center gap-2'>
                    <MdCreate className='icon-btn hover:text-green-600'
                        onClick={onEdit}
                    />
                    <MdDelete className='icon-btn hover:text-red-500'
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default NoteCard