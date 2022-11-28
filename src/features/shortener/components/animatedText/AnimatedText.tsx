import { TypeAnimation } from 'react-type-animation';

type AnimatedTextProps = React.ComponentProps<typeof TypeAnimation>;

function AnimatedText({ sequence, className, repeat, speed, deletionSpeed }: AnimatedTextProps) {
  return (
    <TypeAnimation
      className={className}
      sequence={sequence}
      speed={speed}
      deletionSpeed={deletionSpeed}
      wrapper="span"
      cursor
      repeat={repeat}
    />
  );
}

export default AnimatedText;
