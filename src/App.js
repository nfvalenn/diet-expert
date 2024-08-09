import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/modals/Header';
import Footer from './components/modals/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import RecommendationsPage from './pages/RecommendationsPage';
import AdminDashboard from './pages/AdminDashboardPage';
import AdminUsers from './pages/AdminUsers';
import Home from './pages/HomePage';
import ConsultationPage from './pages/ConsultationPage';
import Results from './pages/ResultsPage';
import AdminArticles from './pages/AdminArticlePage';
import AdminIndeksMassaTubuh from './pages/BMIConditionPage';
import AdminAktivitasFisik from './pages/AktivitasFisikConditionPage';
import AdminBloodSugarPage from './pages/KadarGulaDarahConditionPage';
import AdminStressLevelPage from './pages/TingkatStresPage';
import AdminHba1cPage from './pages/HbAc1ConditionPage';
import AdminConsultationHistoryPage from './pages/AdminConsultationHistoryPage';
import RulesPage from './pages/RulesPage';
import Articles from './pages/ArticleUserPage';
import ConsultationHistoryPage from './pages/ConsultationHistoryPage';
import FoodRecommendationPage from './pages/FoodRecomendationPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ArticleDetailPageUser from './pages/ArticleDetailPageUser';
import ArticlesPageUser from './pages/ArticleUserPage';

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = [
    '/', 
    '/login', 
    '/register', 
    '/home', 
    '/articles', 
    '/articlesuser', 
    '/articlesuser/:id' // This will not match correctly for dynamic routes
  ];

  // Check if the current location path matches any of the noHeaderFooterRoutes, including dynamic routes
  const showHeaderFooter = !noHeaderFooterRoutes.some(route => {
    if (route.includes(':id')) {
      // Handle dynamic route
      const regex = new RegExp(`^${route.replace(':id', '[0-9]+')}$`);
      return regex.test(location.pathname);
    }
    return location.pathname === route;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderFooter && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path='/adminDashboard' element={<AdminDashboard />} />
          <Route path='/home' element={<Home />} />
          <Route path='/admin/results' element={<Results />} />
          <Route path='/admin/articles' element={<AdminArticles />} />
          <Route path='/admin/condition/bmi' element={<AdminIndeksMassaTubuh />} />
          <Route path='/admin/condition/physical-activity' element={<AdminAktivitasFisik />} />
          <Route path='/admin/condition/blood-sugar' element={<AdminBloodSugarPage />} />
          <Route path='/admin/condition/stress-level' element={<AdminStressLevelPage />} />
          <Route path='/admin/condition/hba1c' element={<AdminHba1cPage />} />
          <Route path='/admin/consultation-history' element={<AdminConsultationHistoryPage />} />
          <Route path='/admin/rules' element={<RulesPage />} />
          <Route path='/articles' element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/articlesuser/:id" element={<ArticleDetailPageUser />} />
          <Route path="/articlesuser" element={<ArticlesPageUser />} />
          <Route path='/consultation/history' element={<ConsultationHistoryPage />} />
          <Route path='/admin/food' element={<FoodRecommendationPage />} />
          <Route path='/consultation' element={<ConsultationPage />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default App;
