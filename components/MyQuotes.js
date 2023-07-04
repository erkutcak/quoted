'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useAuthContext } from '@/app/context/AuthContext';
import Modal from 'react-modal';

export async function fetchData(author) {
    try {
        const response = await axios.get(`/api/getUserQuotes?author=${author}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function deleteQuote(quoteId) {
    try {
        await axios.delete(`/api/deleteData?quoteId=${quoteId}`);
    } catch (error) {
        console.error('Error deleting quote:', error);
    }
};

export async function editQuote(quoteId, updatedTitle) {
    try {
        await axios.patch(`/api/editQuote?quoteId=${quoteId}`, { title: updatedTitle });
    } catch (error) {
        console.error('Error editing quote:', error);
    }
};

export default function MyQuotes() {
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const getData = async () => {
            try {
            const responseData = await fetchData(user.email);
            setData(responseData);
            setLoading(false);
            } catch (error) {
            setError(error);
            setLoading(false);
            }
        };
        getData();
        }, [user]);

    const handleDelete = async (quoteId) => {
        try {
            await deleteQuote(quoteId);
            const updatedData = await fetchData(user.email);
            setData(updatedData);
        } catch (error) {
            console.error('Error deleting quote:', error);
        }
    }

    const handleEdit = (quoteId, quoteTitle) => {
        setEditingId(quoteId);
        setUpdatedTitle(quoteTitle);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            await editQuote(editingId, updatedTitle);
            const updatedData = await fetchData(user.email);
            setData(updatedData);
            setEditingId(null);
            setUpdatedTitle("");
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error editing quote:', error);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setUpdatedTitle("");
        setIsModalOpen(false);
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const displayQuotes = data.map((quote) => {
        const formattedDate = DateTime.fromISO(quote.date).toFormat('MM/dd/yyyy - HH:mm');
        return (
            <div key={quote.id} className="h-full w-full max-w-lg mx-auto mb-5 font-medium px-4 py-2 rounded-md bg-[#A37774] shadow-xl">
                <h3 className='text-off-white text-xl font-montserrat font-medium italic'>{`"${quote.title}"`}</h3>
                <h4 className='text-off-white text-lg font-montserrat font-light text-right italic'>{`-${quote.author}`}</h4>
                <div className="flex justify-around items-center mt-4">
                    <h5 className='text-off-white inline-block text-xl text-center'>{quote.likes} Likes</h5>
                    <h5 className='text-off-white text-sm font-montserrat font-light text-right italic'>{formattedDate}</h5>
                </div>
                <div className="flex justify-around items-center mt-4">
                    <button onClick={() => handleEdit(quote.id)} className='text-off-white bg-steel-blue py-2 px-4 rounded'>Edit</button>
                    <button onClick={() => handleDelete(quote.id)} className='text-off-white ml-4 mr-4 bg-steel-blue py-2 px-4 rounded'>Delete</button>
                </div>
            </div>
        )
    })

    return (
        <div className='flex flex-col justify-center items-center w-[95%] max-w-lg'>
            {displayQuotes}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCancel}
                contentLabel="Edit Quote"
                ariaHideApp={false}
                className="flex flex-col justify-center items-center h-auto w-full mx-4 font-medium px-4 py-2 rounded-lg bg-[#A37774] md:w-[50%] lg:w-[50%]"
                style={{
                    overlay: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    },
                }}
            >
                <h2 className='font-archivoblack text-2xl mb-5'>-edit.</h2>
                <textarea
                    className='py-4 px-6 text-ash-black rounded-lg mt-4 outlined-none border font-medium bg-[#A37774] w-full'
                    type="text"
                    rows='4'
                    placeholder='Enter the updated quote'
                    value={updatedTitle || ""}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    required
                />
                <div className="flex justify-around items-center mt-4">
                    <button className='text-off-white mx-4 my-4 bg-steel-blue py-2 px-4 rounded' onClick={handleSave}>Save</button>
                    <button className='text-off-white mx-4 my-4 bg-steel-blue py-2 px-4 rounded' onClick={handleCancel}>Cancel</button>
                </div>
            </Modal>
        </div>
    )
}