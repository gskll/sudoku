/*
  Use a ref to handle UX bug where field stays selected
    when click outside of the board

  Attach a ref to the board, with event handlers to
    setSelectedField to null if the click is outside
    of the board
 */

import { useEffect } from 'react';

const useBoardRef = callback => {
  useEffect(() => {
    document.body.addEventListener('click', callback, { capture: true });

    return () => {
      document.body.removeEventListener('click', callback, {
        capture: true,
      });
    };
  }, []);
};

export default useBoardRef;
