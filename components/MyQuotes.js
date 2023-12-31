'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useAuthContext } from '@/app/context/AuthContext';
import Modal from 'react-modal';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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
            const sortedData = responseData.sort((a, b) => b.date.localeCompare(a.date));
            setData(sortedData);
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
            toast('Quote Deleted!', {
                hideProgressBar: false,
                autoClose: 4600,
                type: "success",
            });
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
                    <ToastContainer />
                    <h3 className='text-off-white text-xl font-montserrat font-medium italic'>{`"${quote.title}"`}</h3>
                    <h4 className='text-off-white text-lg font-montserrat font-light text-right italic'>{`-${quote.author}`}</h4>
                    <div className="flex justify-around items-center mt-4">
                        <div className="flex items-center justify-start border-none rounded-lg overflow-hidden shadow-md bg-transparent cursor-default w-30 h-35">
                            <span className="w-[60px] h-full flex items-center justify-start gap-2 bg-steel-blue pl-[5px] pr-[5px] transition-colors duration-300 active:bg-red-800">
                                <svg fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                                </svg>
                                <span className="text-white font-semibold">Likes</span>
                            </span>
                            <span className="w-10 h-full flex items-center justify-center text-steel-blue font-semibold relative bg-white">
                            {quote.likes}
                            </span>
                        </div>
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