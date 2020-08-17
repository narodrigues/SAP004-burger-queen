/* eslint-disable react-hooks/exhaustive-deps */
import './search.css';
import Input from '../input/Input';
import React, { useState, useEffect } from 'react';

const Search = props => {
  const [searchTerm, setSearchTerm] = useState('');

  const filterArr = (arr, callback) => {
    return arr.filter(callback);
  }

  const filterByName = (order, key) => {
    return order[key].toLowerCase().indexOf(searchTerm.toLowerCase()) === 0;
  }

  const filterByTable = (order, key) => {
    return order[key].toLowerCase().includes(searchTerm);
  }

  useEffect(() => {
    const nameResultLeftOrder = filterArr(props.orderLeft, order => filterByName(order, 'client'));
    const nameResultRightOrder = filterArr(props.orderRight, order => filterByName(order, 'client'));
    const tableResultLeftOrder = filterArr(props.orderLeft, order => filterByTable(order, 'table'));
    const tableResultRightOrder = filterArr(props.orderRight, order => filterByTable(order, 'table'));

    nameResultLeftOrder.length !== 0 ? props.onChangeLeftOrder(nameResultLeftOrder) : props.onChangeLeftOrder(tableResultLeftOrder);
    nameResultRightOrder.length !== 0 ? props.onChangeRightOrder(nameResultRightOrder) : props.onChangeRightOrder(tableResultRightOrder);

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