import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useAuth } from './lib/auth';
import { Box } from '@chakra-ui/react';
import './styles/App.css';
import 'animate.css/animate.compat.css';

// Components
import Navbar from './components/navbar';
import Footer from './components/footer';

// Pages
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Logout from './pages/logout';
import Create from './pages/create';
import Profile from './pages/profilePage';
import NotFound from './pages/notFound';
import ReportIssue from './pages/reportIssue';
import Contact from './pages/contact';
import PollResults from './pages/pollResults';
import Discover from './pages/discover';
import Homepage from './pages/homePage';
import ForgotPassEmail from './pages/ForgotPassEmail';
import EmailSentPage from './pages/emailSent';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function App() {
  const { user, loadingUser } = useAuth();

  return (
    <Router>
      <Box minH="100vh">
        <Navbar />
        <div className="actual-content">
          <Routes>
            <Route
              path="*"
              element={
                <TransitionGroup>
                  <CSSTransition timeout={300} classNames="fade">
                    <Routes>
                      <Route
                        path="/"
                        element={
                          user && !loadingUser ? (
                            <Dashboard />
                          ) : (
                            <Homepage />
                          )
                        }
                      />
                      <Route path="/discover" element={<Discover />} />
                      <Route path="/create" element={<Create />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/profile/:uid" element={<Profile />}/>
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/reportissue" element={<ReportIssue />}/>

                      {/* AUTH */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/logout" element={<Logout />} />

                      {/* Change to /dynamic by a poll id */}
                      <Route
                        path="/poll/:id"
                        element={<PollResults />}
                      />

                      {/* Forgot Password */}
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassEmail />}
                      />
                      <Route
                        path="/email-sent"
                        element={<EmailSentPage />}
                      />

                      {/* NOT FOUND */}
                      <Route
                        path="*"
                        element={<NotFound />}
                      />
                    </Routes>
                  </CSSTransition>
                </TransitionGroup>
              }
            />
          </Routes>
        </div>
      </Box>
      <Footer />
    </Router>
  );
}

export default App;
