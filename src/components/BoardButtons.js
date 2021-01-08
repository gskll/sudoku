import React from 'react';

import { DownloadIcon, RepeatIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup } from '@chakra-ui/react';

const BoardButtons = ({ showSolution, setShowSolution, resetNewBoard }) => (
  <ButtonGroup spacing="6" m="3vh auto">
    <Button
      onClick={() => setShowSolution(true)}
      disabled={showSolution}
      leftIcon={<DownloadIcon />}
      colorScheme="blue"
    >
      Show Solution
    </Button>
    <Button
      onClick={resetNewBoard}
      leftIcon={<RepeatIcon />}
      colorScheme="blue"
      variant="outline"
    >
      Play Again
    </Button>
  </ButtonGroup>
);

export default BoardButtons;
