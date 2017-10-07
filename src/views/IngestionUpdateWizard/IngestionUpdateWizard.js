import React, { Component } from 'react';
import {createMetacatalog} from '../../helpers/TrasformFormToDcat.js'

import {getJsonDataschema, sendPostDataMeta} from '../../components/IngestionWizard/inputform_reader.js'
import { addDataset } from './../../actions.js'
import {reset} from 'redux-form';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DatasetList from '../../components/DatasetList/DatasetList'

const transformer = values => {
  var metacatalog = {}
  metacatalog = createMetacatalog(values, metacatalog)
  return metacatalog
}

class IngestionUpdateForm extends Component {
  constructor(props) {
    super(props);
    console.log("params", JSON.stringify(this.props.match.params.page));
    this.state = { msg: null,
                   msgErr: null 
                  }
    this.showResults = this.showResults.bind(this);
}

 showResults = values =>{
  const transformed = transformer(values)
  //sendPostDataMeta(transformed, undefined)
  const { dispatch, resetForm } = this.props;
  if(localStorage.getItem('token') && localStorage.getItem('token') != 'null'){
  dispatch(addDataset(transformed, localStorage.getItem('token')))
    .then(() => {
      this.setState({msg: 'Dataset caricato correttamente', msgErr: ''})
    }).then(() => {dispatch(reset('wizard'))})
    .catch((error) => {
      console.log(error);
      this.setState({msg: '', msgErr:'Errore durante il caricamento de dataset'})
    })
  console.log('login effettuato');
  } else {
    console.log('token non presente');
  }
}

//<WizardForm onSubmit={this.showResults.bind(this)} />
  render() {
    return (
      <div className="animated fadeIn">
        <div className="alert alert-danger" role="alert">
          Attenzione, il seguente componente è in versione beta.
        </div>
        {this.state.msgErr &&
            <div className="alert alert-danger" role="alert">
              {this.state.msgErr} 
            </div>
        }
        {this.state.msg &&
            <div className="alert alert-success" role="alert">
              {this.state.msg} 
            </div>
        }

        <DatasetList page={this.props.page}/>

        

      </div>
    )
  }
}

IngestionUpdateForm.propTypes = {
  msg: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { msg: state.userReducer.msg }
}

export default connect(mapStateToProps)(IngestionUpdateForm)

