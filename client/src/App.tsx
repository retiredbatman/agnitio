import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { Login } from './routes/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './routes/Home';
import { Toaster } from 'react-hot-toast';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { makeStyles } from 'tss-react/mui';
import { Box } from '@mui/material';

const useStyles = makeStyles()(()=> ({
  root: {
    background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  card: {
    maxWidth: "40%",
    minHeight: "20vh",
    display: "flex",
    alignItems: "center"
  }
}))

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  }
]);

function App() {
  const {classes} = useStyles();
  return (
    <QueryClientProvider client={queryClient}>
      <Grid
        className={classes.root}
        spacing={0}
        alignItems="center"
        component={Paper}
      >
        <Card className={classes.card}>
          <Box p={2}>
          <RouterProvider router={router} />
          </Box>
        </Card>
      </Grid>
      <div><Toaster /></div>
    </QueryClientProvider>
  );
}

export default App;
