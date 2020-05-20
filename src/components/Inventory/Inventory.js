import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddInventory = () =>{
        const product = fakeData[0];
        console.log('before post',fakeData.length);
        fetch('http://localhost:4200/addProduct',{
            method:'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(fakeData)
        })
        .then(res => res.json())
        .then(data => {
            console.log('post successful', data);
        })

    }

    return (
        <div>
            <h2>this is inventory</h2>
            <button onClick={handleAddInventory}>Add Inventory</button>
        </div>
    );
};

export default Inventory;