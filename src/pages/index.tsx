import Button from 'components/elements/button/Button';
import Input from 'components/elements/Input/Input';
import Label from 'components/elements/label/Label';
import FormInput from 'components/formInput/FormInput';
import React, { useState } from 'react';

export default function Home() {
  const [val, setVal] = useState<string>('');

  function handleChange(e) {
    setVal(e.target.value);
  }

  return (
    <div className="max-w-xl mx-auto">
      <FormInput label="label" id="id" name="name" value={val} onChange={(e) => handleChange(e)} />
      <Button className="" onClick={() => console.log('click')}>
        Button
      </Button>
    </div>
  );
}
