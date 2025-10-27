import React from 'react';
import { User } from '../types';
import { Page } from '../App';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';

interface AuthPageProps {
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ currentUser, onLogin, onLogout, onNavigate }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {currentUser ? (
        <ProfilePage user={currentUser} onLogout={onLogout} onNavigate={onNavigate}/>
      ) : (
        <LoginPage onLogin={onLogin} />
      )}
    </div>
  );
};

export default AuthPage;
