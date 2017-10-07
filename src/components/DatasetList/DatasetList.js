import React, { Component } from 'react';
import { serviceurl } from '../../config/serviceurl.js'

class DatasetList extends Component {
    constructor(props){
        super(props);
        console.log("PROPS",JSON.stringify(props));
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        
        this.getList().then(data => {
            this.setState({
                list: data
            });
            console.log("DATA", data);
        });
    }

    getList(){
        this.token = "Basic YWxlc3NhbmRybzpzaWx2aWFsZTc4ODE="//localStorage.getItem("token");
        var url = serviceurl.apiURLCatalog + "/dataset-catalogs?page=1&limit=3";

        console.log("TOKEN", this.token);
        console.log("URL", url);

        return fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.token
            }
          }).then(response => response.json());
    }

    itemClicked(index) {
        console.log('item clicked', index)
    }
    
    

  render() {
    return (
        <ul className='list-group'>
            {
                this.state.list.map((item, index) => 
                    <li className='list-group-item'
                        key={item.dcatapit.identifier}
                        onClick={() => this.itemClicked(index)}
                    >
                        {item.dcatapit.name}
                    </li>
                )
            }
        </ul>
    )
    
  }
}

export default DatasetList;
