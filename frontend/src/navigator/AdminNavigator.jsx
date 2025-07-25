import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Actors from '../components/admin/Actors';
import Dashboard from '../components/admin/Dashboard';
import Header from '../components/admin/Header';
import Movies from '../components/admin/Movies';
import Navbar from '../components/admin/Navbar';
import NotFound from '../components/NotFound';
import MovieUpload from '../components/admin/MovieUpload';

import ActorUpload from '../components/models/ActorUpload';


export default function AdminNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };

  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };

  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };

  return (
    <>
      <div className='flex dark:bg-primary bg-white'>
        <Navbar />
        <div className='flex-1 p-2 max-w-screen-xl'>
          <Header
            onAddMovieClick={displayMovieUploadModal}
            onAddActorClick={displayActorUploadModal}
          />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/actors' element={<Actors />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </>
  );
}
