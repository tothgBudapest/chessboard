import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const StyledBox = styled(Box)`
  width: 50px;
  height: 50px;
  background-color: white;
  border: 1px solid black;
  
  &.odd {
    background-color: grey;
  }
  
  &.active {
    background-color: lightyellow !important; 
  }
`;

const ChessboardPage: NextPage = () => {
  const [didMount, setDidMount] = useState(false)
  const router = useRouter();
  const { boardSize, availableStepsSize } = router.query;
  const [remainingStepsSize, setRemaining] = useState(Number.parseInt(availableStepsSize as string));
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0});
  const [steps, setCurrentSteps] = useState([]);

  useEffect(() => { setDidMount(true) }, [])
  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeys);
    // clean up
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, []);

  useEffect(() => {
    if(didMount) {
      setCurrentSteps(stepsArr => [...stepsArr, [currentPosition.x, currentPosition.y]]);
      setRemaining(remainingSteps => remainingSteps -= 1);
    }
  }, [currentPosition]);

  useEffect(() => {
    if(remainingStepsSize === 0) {
      router.push({
        pathname: '/chess-result',
        query: {
          steps: JSON.stringify(steps)
        }
      });
    }
  }, [remainingStepsSize]);

  const isEven = (value: number) => {
    return value % 2 == 0;
  }

  const isCurrentPosition = (rowIndex: number, columnIndex: number, currentPosition: { x: number, y: number }) => {
    return rowIndex === currentPosition.x && columnIndex === currentPosition.y;
  }

  const getClassName = (rowIndex: number, columnIndex: number, currentPosition: { x: number, y: number }) => {
    const classNames = [];
    if (isEven(columnIndex)) {
      classNames.push(isEven(rowIndex) ? 'odd' : 'even');
    } else {
      classNames.push(isEven(rowIndex) ? 'even' : 'odd');
    }

    if (isCurrentPosition(rowIndex, columnIndex, currentPosition)) {
      classNames.push('active');
    }

    return classNames.join(' ');
  }

  const handleClick = (rowIndex: number, columnIndex: number) => {
    setCurrentPosition({x: rowIndex, y: columnIndex})
  }

  const handleArrowKeys = (event) =>  {
    switch (event.keyCode) {
      case 37: // Left arrow
        setCurrentPosition(prevPosition => ({ x: prevPosition.x, y: prevPosition.y - 1 }));
        break;
      case 38: // Up arrow
        setCurrentPosition(prevPosition => ({ x: prevPosition.x - 1, y: prevPosition.y }));
        break;
      case 39: // Right arrow
        setCurrentPosition(prevPosition => ({ x: prevPosition.x, y: prevPosition.y + 1 }));
        break;
      case 40: // Down arrow
        setCurrentPosition(prevPosition => ({ x: prevPosition.x + 1, y: prevPosition.y }));
        break;
      default:
        break;
    setRemaining(steps => steps--);
    }
  }


  const renderLine = (lineSize: number, columnIndex: number) => {
   return (
     <Grid item key={uuidv4()}>
       {[...Array(lineSize)].map((v, rowIndex) => (
         <StyledBox key={uuidv4()}
                    onClick={() => handleClick(rowIndex, columnIndex)}
                    className={getClassName(rowIndex, columnIndex, currentPosition)}
         />
       ))}
     </Grid>
   )
  }

  const renderColumns = (lineSize: number) => {
    return (
      <Grid justifyContent={'center'} container direction={'row'} item key={uuidv4()}>
        {[...Array(lineSize)].map((v, index) => (
          renderLine(lineSize, index)
        ))}
      </Grid>
    )
  }



  return (

  <Container maxWidth="lg" sx={{height: '100%'}} tabIndex={0}>
    <Stack my={5} spacing={4} direction="column" justifyContent="center" alignItems="center">
      <Grid container>
        {renderColumns(Number.parseInt(boardSize?.toString()))}
      </Grid>
      <Box>
        <Typography>Remaining steps: {`${remainingStepsSize}/${availableStepsSize}`}</Typography>
      </Box>

      <Box>{JSON.stringify(steps)}</Box>
    </Stack>
  </Container>
  );
};

export default ChessboardPage;
