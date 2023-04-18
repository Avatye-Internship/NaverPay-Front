import * as React from 'react';
import {
  Route, RouteComponentProps, Switch, withRouter,
} from 'react-router';
import Product from './product';

const App: React.FC<RouteComponentProps> = ({ history }): JSX.Element => {
  React.useEffect(() => {
    // 마운트 될 때 /helloReact로 페이지 이동
    history.push('/helloReact');
  }, []);

  return (
    <Switch>
      <Route exact path="/helloReact" component={Product} />
    </Switch>
  );
};

export default withRouter(App);
