import { CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Toolbar } from './components/Toolbar/Toolbar';
import { BoardsPage } from './pages/BoardPage/BoardPage';
import HomePage from './pages/HomePage/HomePage';
import { Routes } from './service/config';
import { theme } from './service/theme';

function App() {
  return (
    <div className='LightTheme'>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Router>
            <Toolbar />
            <Switch>
              <Route path={`${Routes.boards}/:id`} component={BoardsPage} />
              <Route path={`${Routes.join}/:id`} component={HomePage} />
              <Route exact path='/*' component={HomePage} />
            </Switch>
          </Router>
        </StylesProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
