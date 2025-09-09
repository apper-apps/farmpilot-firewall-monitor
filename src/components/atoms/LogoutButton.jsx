import { useContext } from 'react';
import { AuthContext } from '../../App';
import Button from './Button';
import ApperIcon from '../ApperIcon';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logout}
      className="text-gray-600 hover:text-red-600"
    >
      <ApperIcon name="LogOut" className="h-4 w-4" />
    </Button>
  );
};

export default LogoutButton;