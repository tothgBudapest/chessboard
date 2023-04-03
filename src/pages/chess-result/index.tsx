import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Container, Grid, Input, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';

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

const ChessResultPage: NextPage = () => {
  const router = useRouter();
  const { steps } = router.query;

  const goBack = () => {
    router.push({
      pathname: '/'
    });
  }

  return (
    <Container maxWidth="lg" sx={{height: '100%'}} tabIndex={0}>
      <Stack my={5} spacing={4} direction="column" justifyContent="center" alignItems="center">
        <Button onClick={goBack}>Go back</Button>
        <Box>{JSON.stringify(steps)}</Box>
      </Stack>
    </Container>
  );
};

export default ChessResultPage;
