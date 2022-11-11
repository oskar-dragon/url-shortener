import Button from 'components/button/Button';
import Input from 'components/Input/Input';
import React from 'react';

export default function Home() {
  return (
    <div className="max-w-xl mx-auto">
      <Input name="test" id="test" placeholder="lol" />
      <Button onClick={() => console.log('click')}>Button</Button>
    </div>
  );
}
