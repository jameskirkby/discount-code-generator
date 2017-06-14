import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import ClipboardButton from 'react-clipboard.js';

import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      type: 'per',
      amount: '',
      date: moment().add(7, 'days')
    };

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getCode = this.getCode.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleTypeChange(event) {

    this.setState({
      type: event.target.value
    });

    return true;

  }

  handleAmountChange(event) {

    let value = event.target.value;

    if(value.includes('.')) {
      value = value.replace('.', '');
    }

    this.setState({
      amount: value
    });

    return true;

  }

  handleDateChange(date) {

    this.setState({ date });

    return true;

  }

  getCode() {

    if(this.state.amount === '') {
      return this.state.amount;
    }

    return `${this.state.amount}_${this.state.type}_${moment(this.state.date).format('DD-MM-YYYY')}`;
  }

  handleCopy() {

    this.setState({
      copied: true
    });

    setTimeout(() => {
      this.setState({
        copied: false
      });  
    }, 5000);
    
  }

  render() {
    return (
      <div className="app container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">Discount Code Generator</div>
              <div className="panel-body">
                <div className="form-horizontal">
                  <div className="form-group">
                    <label htmlFor="type" className="col-md-4 control-label">Discount Type</label>
                    <div className="col-md-8">
                      <select onChange={this.handleTypeChange} value={this.state.type} id="type" className="form-control">
                        <option value="per">Percentage</option>
                        <option value="pou">Fixed Discount</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount" className="col-md-4 control-label">Discount Amount</label>
                    <div className="col-md-8">
                      <div className="input-group">
                        {this.state.type === 'pou' ? <span className="input-group-addon">£</span> : ''}
                        <input type="number" className="form-control" value={this.state.amount} onChange={this.handleAmountChange} min="0" step="1" />
                        {this.state.type === 'per' ? <span className="input-group-addon">%</span> : ''}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount" className="col-md-4 control-label">Discount Expiry Date</label>
                    <div className="col-md-8">
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <div className="form-horizontal">
                  <div className="form-group">
                    <label className="col-md-4 control-label">Generated Code</label>
                    <div className="col-md-8">
                      <div className="input-group" style={{width: '100%'}}>
                        <input type="text" className="form-control" value={this.getCode()}  style={{width: '70%'}} readOnly />
                        <ClipboardButton onSuccess={this.handleCopy} data-clipboard-text={this.getCode()} className="input-group-addon btn btn-primary" style={{width: '30%', height: 34}}>Copy</ClipboardButton>
                        {this.state.copied ? <p>Discount code copied!</p> : ''}
                        
                      </div>
                    </div>
                  </div>
                </div>

                <p>You will need to add this code to the <strong>Discounts</strong> area in the Shopify admin first</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
