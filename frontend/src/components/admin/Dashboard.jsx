import React from 'react';
import AppInfoBox from '../AppInfoBox';
import LatestUploads from '../LatestUploads';

export default function Dashboard() {
  return (
    <div className='grid grid-cols-3 gap-5 my-5'>
      <AppInfoBox title='Total Uploads' subTitle='50' />
      <AppInfoBox title='Total Reviews' subTitle='1,200' />
      <AppInfoBox title='Total Users' subTitle='500' />

      <LatestUploads />
    </div>
  );
}
