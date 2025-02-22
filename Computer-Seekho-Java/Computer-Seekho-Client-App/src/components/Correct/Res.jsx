import React from 'react'
import Img1 from '../images/atos.png'
import Img2 from '../images/tata.png'
import Img3 from '../images/onmobile.png'
import Img4 from '../images/altair.png'
import Img5 from '../images/capg.png'
import CardStacker from './CardStacker'

const App = () => {

  const data = [
    {
      title: 'Kirby',
      subtitle: 'Star Allies',
      rating: '4.7',
      backgroundColors: { top: '#51D1F7', bottom: '#5B8FEF' },
      image: Img1,
    },
    {
      title: 'Mario',
      subtitle: 'Super Bros',
      rating: '4.8',
      backgroundColors: { top: '#F85B6B', bottom: '#E83842' },
      image: Img2,
    },
    {
      title: 'Pokemon',
      subtitle: 'Bulbasaur',
      rating: '4.9',
      backgroundColors: { top: '#28DFAB', bottom: '#26CBCF' },
      image: Img3,
    },
    {
      title: 'Sonic',
      subtitle: 'Blue Sonic',
      rating: '4.9',
      backgroundColors: { top: '#6F3FF1', bottom: '#6E3CCA' },
      image: Img4,
    },
    {
      title: 'Pokemon',
      subtitle: 'Pikachu',
      rating: '5.0',
      backgroundColors: { top: '#FBDA35', bottom: '#E3A237' },
      image: Img5,
    },
  ];
  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center"> 

      <CardStacker data={data}></CardStacker>
      
    </div>
  )
}

export default App

