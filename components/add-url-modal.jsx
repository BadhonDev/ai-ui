"use client"
import React, { useState } from 'react';

// import Image from "next/image"
// import { useState } from "react"
// import { uploadFiles } from "@/actions/file-upload"

const AddURLModal = () => {
  
  const [url, setUrl] = useState('');
  const [crawlStared, setCrawlStared] = useState(false); 
  const backend_url = process.env.NEXT_PUBLIC_BASE_URL
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const handleOk = () => {
    setCrawlStared(false); // Reset the state
  };

  const handleAddClick = async () => {
    try {
      const response = await fetch(`${backend_url}/start-crawl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (response.ok) {
        console.log('Crawl started successfully');
        setCrawlStared(true)

      } else {
        console.error('Failed to start crawl:', await response.text());
        // Additional error handling (e.g., show error message)
      }
    } catch (error) {
      console.error('Error starting crawl:', error);
      // Additional error handling (e.g., show error message)
    }
  };

  return (
    <div
      id="hs-vertically-centered-modal-url"
      className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
        <div className="flex w-full flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex justify-between items-center py-3 px-4">
            <h3 className="font-bold text-gray-800 dark:text-white">Add URL</h3>
            <button
              type="button"
              className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-vertically-centered-modal-url"
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          {crawlStared ? (
            <div className="flex flex-col items-center justify-center gap-5 p-4">
              {/* Success message and OK button */}
              <div className="font-bold text-xl">URL added successfully!</div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleOk}
              >
                OK
              </button>
            </div>
          ) : (
            <>
              <div className="p-4 overflow-y-auto">
                <input
                  type="text"
                  className="py-3 px-4 block w-full border-2 border-gray-800 rounded-lg text-sm"
                  placeholder="Add URL here"
                  value={url}
                  onChange={handleUrlChange}
                  autoFocus
                />
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  data-hs-overlay="#hs-vertically-centered-modal-url"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={handleAddClick}
                >
                  Add
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


export default AddURLModal
