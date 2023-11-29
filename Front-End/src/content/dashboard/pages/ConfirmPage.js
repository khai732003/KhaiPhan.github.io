import React, { useState, useEffect } from 'react';
import ListConfirm from './ListConfirm';
import UpdateDelivered from './UpdateDelivered ';
import ListNotConfirm from './ListNotConfirm';
import ListDelivered from './ListDelivered';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ConfirmPage() {
  const navigate = useNavigate();
  // State variable to trigger useEffect in child components
  const [triggerUpdate, setTriggerUpdate] = useState(0);

  useEffect(() => {
  }, [triggerUpdate]);


  return (
    <div >
      <div style={{ display: 'flex', flexDirection: 'row', height:'72.4vh', paddingTop:'7rem' }}>
        <ListConfirm triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />
        <UpdateDelivered triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />
      </div>
      

    </div>
  );
}
