import React, { useState, useEffect } from 'react';
import ListConfirm from './ListConfirm';
import UpdateDelivered from './UpdateDelivered ';
import ListNotConfirm from './ListNotConfirm';
import ListDelivered from './ListDelivered';

export default function ConfirmPage() {
  // State variable to trigger useEffect in child components
  const [triggerUpdate, setTriggerUpdate] = useState(0);

  useEffect(() => {
  }, [triggerUpdate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ListNotConfirm triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />
      <ListConfirm triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />
      <UpdateDelivered triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />
      <ListDelivered triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} />
    </div>
  );
}
