import React from 'react';
import './card-list.styles.css';
import { Card } from '../card/card.component';

/* props represents the whole attribute of the html tag. */
export const CardList = (props) => (
  <div className='card-list'>
    {/* Map usually return a new array, but React is smart to know that if we return a bunch of HTML block (as an array), it will just display them right away instead of still holding as array. */}
    {props.monsters.map((monster) => (
      <Card key={monster.id} monster={monster} />
    ))}
  </div>
);
