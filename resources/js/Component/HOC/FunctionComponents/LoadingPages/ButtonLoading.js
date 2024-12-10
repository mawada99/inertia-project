import React from 'react';
import CustomSpinner from '../CustomSpinner';


export default function ButtonLoading(props) {
  return <CustomSpinner {...props} name="BeatLoader" size={8} margin={2} />
}
