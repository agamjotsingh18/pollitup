import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from "./lib/auth";
import { Box } from "@chakra-ui/react";
import "./styles/App.css";
import "animate.css/animate.compat.css";

// Components
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Pages
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Logout = lazy(() => import("./pages/logout"));
const Create = lazy(() => import("./pages/create"));
const Testimonials = lazy(() => import("./pages/testimonials"));
const Profile = lazy(() => import("./pages/profilePage"));
const NotFound = lazy(() => import("./pages/notFound"));
const ReportIssue = lazy(() => import("./pages/reportIssue"));
const Contact = lazy(() => import("./pages/contact"));
const PollResults = lazy(() => import("./pages/pollResults"));
const Discover = lazy(() => import("./pages/discover"));
const Homepage = lazy(() => import("./pages/homePage"));
const ForgotPassEmail = lazy(() => import("./pages/ForgotPassEmail"));
const EmailSentPage = lazy(() => import("./pages/emailSent"));


function App() {
  const { user, loadingUser } = useAuth();

  return (
    <Router>
      <Box minH="100vh">
        <Navbar />
        <div className="actual-content">
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  timeout={300}
                  classNames="fade"
                >
                  <Suspense fallback={<div> ... </div>}>
                  <Switch location={location}>
                    <Route
                      exact
                      path="/"
                      component={user && !loadingUser ? Dashboard : Homepage}
                    />
                    <Route path="/discover" component={Discover} />
                    <Route path="/create" component={Create} />
                    <Route path="/testimonials" component={Testimonials} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/profile/:uid" component={Profile} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/reportissue" component={ReportIssue} />

                    {/* AUTH */}
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/logout" component={Logout} />

                    {/* Change to /dynamic by a poll id */}
                    <Route path="/poll/:id" component={PollResults} />

                    {/* Forgot Password */}
                    <Route
                      path="/forgot-password"
                      component={ForgotPassEmail}
                    />
                    <Route path="/email-sent" component={EmailSentPage} />

                    {/* NOT FOUND */}
                    <Route component={NotFound} />
                  </Switch>
                  </Suspense>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </div>
      </Box>
      <Footer />
    </Router>
  );
}

export default App;
