import React from 'react';
import { Card, Badge } from 'components/ui';
import { RegionMap } from 'components/shared';
import { theme } from 'twin.macro';
import map from 'assets/assets/images/uz.svg';
import { DatePicker } from 'components/ui';

const twColor = theme`colors`;

const mapColors = [
  twColor.indigo['600'],
  twColor.blue['500'],
  twColor.green['500'],
  twColor.yellow['500'],
  twColor.yellow['500'],
  twColor.pink['500'],
  twColor.pink['500'],
  twColor.purple['500'],
  twColor.purple['500'],
  twColor.blue['500'],
];

const dotColor = [
  'bg-indigo-600',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-pink-500',
  'bg-purple-500',
  'bg-blue-500',
];

const getMapColors = (data = []) => {
  return data.map((item, index) => ({
    ...item,
    color: mapColors[index],
  }));
};

const LeadByCountries = ({ data = [], className, change, currentDate }) => {
  return (
    <Card className={className}>
      <div className='flex items-center justify-between mb-6'>
        <h4>Statistika</h4>
        <DatePicker
          value={currentDate}
          onChange={change}
          placeholder={currentDate}
          className='w-1/4'
        />
      </div>
      <div className='grid lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 px-4'>
          {/* <Region`Map  data={getMapColors(data)} valueSuffix="%" /> */}
          <img src={map} alt='' />
          {/* <Map></Map> */}
        </div>
        <div className='flex flex-col justify-center px-4'>
          {data.map((item, index) => (
            <div className='mb-6 flex justify-between' key={item.name}>
              <div className='flex items-center gap-2'>
                <Badge innerClass={dotColor[index]} />
                <div className='font-semibold'>{item.name}</div>
              </div>
              <div>{item.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default LeadByCountries;
