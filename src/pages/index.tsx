import Head from 'next/head'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography, Input, Box, Button, Container, Stack } from '@mui/material';

export default function Home() {
  const router = useRouter();
  const [boardSize, setBoardSize] = useState(0);
  const [availableStepsSize, setAvailableStepsSize] = useState(0);

  const navigateToChessBoard = () => {
    router.push({
      pathname: '/chess-board',
      query: {
        boardSize,
        availableStepsSize
      }
    });
  };

  const handleBoardSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBoardSize(value as number);
  };

  const handleAvailableStepsSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAvailableStepsSize(value as number);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg" sx={{height: '100%'}}>
        <Stack my={5} spacing={4} direction="column" justifyContent="center" alignItems="center">
          <Grid container justifyContent={'center'} alignItems={'center'}>
            <Box>
              <Typography>Chess board size </Typography>
              <Input value={boardSize} onChange={handleBoardSizeChange}/>
            </Box>
            <Box>
              <Typography>Number of available steps: </Typography>
              <Input value={availableStepsSize} onChange={handleAvailableStepsSizeChange}/>
            </Box>
            <Button onClick={navigateToChessBoard}>Ok</Button>
          </Grid>
        </Stack>
      </Container>

    </>
  )
}
