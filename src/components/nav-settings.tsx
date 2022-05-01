import React, { useState } from 'react';
import { Button } from './button';

export function Nav(): JSX.Element {
  const [settingsClicked, setSettingsClicked] = useState(false);

  return (
    <div className="settings">
      <nav>
        <Button text="Settings" className="btn-settings"></Button>
      </nav>
    </div>
  );
}
