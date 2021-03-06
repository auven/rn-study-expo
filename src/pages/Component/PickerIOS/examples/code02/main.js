import React from 'react'
import { View, Text, PickerIOS } from 'react-native'

const PickerItemIOS = PickerIOS.Item

const CAR_MAKES_AND_MODELS = {
  amc: {
    name: 'AMC',
    models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer']
  },
  alfa: {
    name: 'Alfa-Romeo',
    models: [
      '159',
      '4C',
      'Alfasud',
      'Brera',
      'GTV6',
      'Giulia',
      'MiTo',
      'Spider'
    ]
  },
  aston: {
    name: 'Aston Martin',
    models: ['DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage']
  },
  audi: {
    name: 'Audi',
    models: [
      '90',
      '4000',
      '5000',
      'A3',
      'A4',
      'A5',
      'A6',
      'A7',
      'A8',
      'Q5',
      'Q7'
    ]
  },
  austin: {
    name: 'Austin',
    models: ['America', 'Maestro', 'Maxi', 'Mini', 'Montego', 'Princess']
  },
  borgward: {
    name: 'Borgward',
    models: ['Hansa', 'Isabella', 'P100']
  },
  buick: {
    name: 'Buick',
    models: [
      'Electra',
      'LaCrosse',
      'LeSabre',
      'Park Avenue',
      'Regal',
      'Roadmaster',
      'Skylark'
    ]
  },
  cadillac: {
    name: 'Cadillac',
    models: ['Catera', 'Cimarron', 'Eldorado', 'Fleetwood', 'Sedan de Ville']
  },
  chevrolet: {
    name: 'Chevrolet',
    models: [
      'Astro',
      'Aveo',
      'Bel Air',
      'Captiva',
      'Cavalier',
      'Chevelle',
      'Corvair',
      'Corvette',
      'Cruze',
      'Nova',
      'SS',
      'Vega',
      'Volt'
    ]
  }
}

export default class PickerStyleExample extends React.Component {
  state = {
    carMake: 'cadillac',
    modelIndex: 0
  }

  render() {
    return (
      <PickerIOS
        itemStyle={{
          fontSize: 25,
          color: 'red',
          textAlign: 'left',
          fontWeight: 'bold'
        }}
        selectedValue={this.state.carMake}
        onValueChange={carMake => this.setState({ carMake, modelIndex: 0 })}
      >
        {Object.keys(CAR_MAKES_AND_MODELS).map(carMake => (
          <PickerItemIOS
            key={carMake}
            value={carMake}
            label={CAR_MAKES_AND_MODELS[carMake].name}
          />
        ))}
      </PickerIOS>
    )
  }
}
