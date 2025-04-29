// src/pages/Matches.jsx
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DateScroller from '../components/DateScroller';
import FavouritesCarousel from '../components/FavouritesCarousel';
import CompetitionList from '../components/CompetitionList';

// contoh data dummy
const weeks = ['LIVE','SAT 15 MAR','SUN 16 MAR','MON 17','TUE 18','...'];
const favs = [
  { label:'Premier League', logo:'/assets/pl.png' },
  { label:'UCL',           logo:'/assets/ucl.png' },
  { label:'Real Madrid',   logo:'/assets/rm.png' },
  { label:'Barcelona',     logo:'/assets/barca.png' }
];
const comps = [
  {
    name:'UCL – International',
    matches:[
      { id:1, home:'DORTMUND', time:'02:00', away:'BARCELONA' },
      { id:2, home:'ASTON VILLA', time:'02:00', away:'PSG' },
    ]
  },
  {
    name:'Liga Profesional – Argentina',
    matches:[
      { id:3, home:'VELEZ S', time:'FT 0-1', away:'SARMIENTO' }
    ]
  }
];

export default function Matches() {
  const [selWeek, setSelWeek] = useState(weeks[0]);
  const [search, setSearch] = useState('');
  return (
    <div>
      <SearchBar onSearch={setSearch}/>
      <DateScroller
        weeks={weeks} selected={selWeek}
        onSelect={setSelWeek}/>
      <FavouritesCarousel items={favs}/>
      <CompetitionList competitions={comps}/>
    </div>
  );
}
