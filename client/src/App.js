import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from 'queryClient';
import AuthContextProvider from 'store/AuthContextLayout';

import Root, { loader as rootLoader } from 'pages/Root';
import Homepage, { loader as homeLoader } from 'pages/Home';
import LoginPage from 'pages/Login';
import SignupPage from 'pages/Signup';
import ProgramsPage, {
  loader as programsLoader,
} from 'pages/Programs/Programs';
import TeachPage from 'pages/Teach';
import NewBootcamp, {
  action as publishBootcamp,
} from 'pages/Bootcamp/NewBootcamp';
import NewProgramPage from 'pages/Programs/NewProgram';

import login from 'actions/login';
import logout from 'actions/logout';
import signup from 'actions/signup';
import newProgram from 'actions/newProgram';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthContextProvider />}>
      <Route
        exact
        loader={rootLoader}
        action={logout}
        path="/"
        element={<Root />}
      >
        <Route index element={<Homepage />} loader={homeLoader} />
        <Route path="login" element={<LoginPage />} action={login} />
        <Route path="signup" element={<SignupPage />} action={signup} />
        <Route
          path="programs"
          element={<ProgramsPage />}
          loader={programsLoader}
        />
        <Route
          path="/new-program"
          element={<NewProgramPage />}
          action={newProgram}
        />
        <Route path="/teach" element={<TeachPage />} />

        <Route
          path="bootcamps/new"
          element={<NewBootcamp />}
          action={publishBootcamp}
        />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
