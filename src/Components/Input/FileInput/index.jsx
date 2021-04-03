import React from 'react';

import PropTypes from 'prop-types';

import { Input } from 'reactstrap';

function FileInput(props) {

  const { fileHandler } = props;


  return (
    <Input type="file" onChange={fileHandler} />
  );
}

FileInput.propTypes = {
  fileHandler: PropTypes.func.isRequired,
}

export default FileInput;
