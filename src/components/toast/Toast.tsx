import { Toaster as HotToast } from 'react-hot-toast';

function Toaster() {
  return (
    <HotToast
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: 'rgb(250 250 250)',
          color: '#000',
        },

        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }}
    />
  );
}

export default Toaster;
