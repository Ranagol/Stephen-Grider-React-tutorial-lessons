import React, { useState } from 'react';
//import Accordion from './components/Accordion';
//import Search from './components/Search';
import Dropdown from './components/Dropdown';

const items = [//This is for the Accordion
  {
    title: 'What is React?',
    content: 'React is a front end javascript framework',
  },
  {
    title: 'Why use React?',
    content: 'React is a favorite JS library among engineers',
  },
  {
    title: 'How do you use React?',
    content: 'You use React by creating components',
  },
];

const options = [//This is for the Dropdown
 { label: 'The red color', value: 'red'},
 { label: 'The green color', value: 'green'},
 { label: 'The blue color', value: 'blue'},
];

export default () => {//A little strange, but this is our App component
  const [selectedColor, setSelectedColor] = useState(options[0]);//reminder: options[0] is the red color ...

  return (
    <div>
      <Dropdown
        options={options}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};
