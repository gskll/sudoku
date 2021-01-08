/*
 * Deselect all board fields when click outside of board
 *
 * Pass ref to board grid
 * Attach event handler on body click
 * Remove event handler when on cleanup
 * On body click: remove selected if click outside of board
 */

import { useEffect } from 'react';

const useBoardRef = (ref, setSelectedField) => {
  const onBodyClick = event => {
    if (ref.current && ref.current.contains(event.target)) {
      return;
    }
    setSelectedField({});
  };

  useEffect(() => {
    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);
};

export default useBoardRef;
