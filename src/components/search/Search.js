/* eslint-disable react-hooks/exhaustive-deps */
import './search.css';
import Input from '../input/Input';
import React, { useState, useEffect } from 'react';

const Search = props => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const results = props.order1.filter(order => 
      order.client.toLowerCase().indexOf(searchTerm.toLowerCase()) === 0
    );
    const results2 = props.order1.filter(order => 
      order.table.toLowerCase().includes(searchTerm)
    );
    const results3 = props.order2.filter(order => 
      order.client.toLowerCase().indexOf(searchTerm.toLowerCase()) === 0
    );
    const results4 = props.order2.filter(order => 
      order.table.toLowerCase().includes(searchTerm)
    );

    results.length !== 0 ? props.onChange1(results) : props.onChange1(results2);
    results3.length !== 0 ? props.onChange2(results3) : props.onChange2(results4);

  }, [searchTerm]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='search'>
      <label htmlFor='search' className='search-label'>Pesquisar: </label>
      <Input type='text' value={searchTerm} placeholder='Cliente ou mesa' onChange={handleChange} className='search-input'/>
    </div>
  )
}

export default Search;