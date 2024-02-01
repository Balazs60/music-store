import { useNavigate } from 'react-router-dom';

type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';

const SuccessfulOrderPage = () => {
  const navigate = useNavigate();

  const handleNavigateToMainPage = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <p style={styles.message}>Your order is successful, and under process!</p>
        <button style={styles.button} onClick={handleNavigateToMainPage}>
          Main Page
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Adjust the height as needed
  },
  box: {
    padding: '20px',
    border: '2px solid #4CAF50', // Green border color
    borderRadius: '10px',
    backgroundColor: '#f8f8f8', // Light gray background color
    textAlign: 'center' as TextAlign, // Use TextAlign without undefined
  },
  message: {
    color: '#4CAF50', // Green text color
    fontWeight: 'bold',
    fontSize: '18px',
  },
  button: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#4CAF50', // Green button color
    color: '#fff', // White text color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SuccessfulOrderPage;
