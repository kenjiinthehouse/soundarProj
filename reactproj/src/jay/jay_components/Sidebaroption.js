import React, { useEffect, useState } from 'react';
import { Link, Router, Switch, withRouter } from 'react-router-dom';
import '../jay_styles/Sidebar.scss';

function Sidebaroption(props) {
  const { optionLink, optionName, optionActive } = props;
  return (
    <>
      {optionActive ? (
        <div className="side-bar-member-option side-bar-option-active">
          {optionName}
        </div>
      ) : (
        <div className="side-bar-option">
          <Link to={optionLink} className="side-bar-option-link">
            {optionName}
          </Link>
        </div>
      )}
    </>
  );
}

export default withRouter(Sidebaroption);
