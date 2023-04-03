import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Container, Stack } from '@mui/material';

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
