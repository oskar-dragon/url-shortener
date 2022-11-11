import Button from 'components/elements/button/Button';
import Input from 'components/elements/Input/Input';
import Label from 'components/elements/label/Label';
import React from 'react';

export default function Home() {
  return (
    <div className="max-w-xl mx-auto">
      <Label htmlFor="test">Label</Label>
      <Input name="test" id="test" placeholder="lol" />
      <Button onClick={() => console.log('click')}>Button</Button>
    </div>
  );
}
