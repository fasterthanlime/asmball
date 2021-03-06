import * as React from "react";
import { connect, actionCreatorsList, Dispatchers } from "./connect";
import { RootState } from "../types";

import ReactHintFactory = require("react-hint");
const ReactHint = ReactHintFactory(React);

import Menu from "./menu";
import Game from "./game";
import FloatiesContainer from "./floaties-container";
import styled from "./styles";

const AppDiv = styled.div`
  max-width: 1200px;
  min-height: 600px;

  margin: 0 auto;
  padding: 30px;
  background: white;

  position: relative;

  font-size: ${props => props.theme.fontSizes.baseText};
`;

class App extends React.PureComponent<Props & DerivedProps> {
  render() {
    return (
      <AppDiv>
        {this.renderPage()}
        <FloatiesContainer />
        <ReactHint events />
      </AppDiv>
    );
  }

  renderPage(): JSX.Element {
    const { page } = this.props;
    if (page === "menu") {
      return <Menu />;
    }

    return <Game />;
  }
}

interface Props {}

const actionCreators = actionCreatorsList("setPage");

type DerivedProps = {
  page: string;
} & Dispatchers<typeof actionCreators>;

export default connect<Props>(App, {
  actionCreators,
  state: (rs: RootState) => ({
    page: rs.ui.page,
  }),
});
