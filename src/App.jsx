import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { BrowseSection } from "./components/BrowseSection";
import { TopColleges } from "./components/TopColleges";
import { CollegeDetail } from "./components/CollegeDetail";
import { CounsellingForm } from "./components/CounsellingForm";

import { CollegeDashboard } from "./components/CollegeDashboard";
import { collegesData } from "./components/collegeData";


export default function App() {
    const [selectedCollegeId, setSelectedCollegeId] = useState(null);
    const [reviewsOnly, setReviewsOnly] = useState(false);
    const [showCounsellingForm, setShowCounsellingForm] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleCollegeClick = (collegeId) => {
        setSelectedCollegeId(collegeId);
        setReviewsOnly(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToHome = () => {
        setSelectedCollegeId(null);
        setReviewsOnly(false);
        setShowCounsellingForm(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleGetCounselling = () => {
        setShowCounsellingForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackFromCounselling = () => {
        setShowCounsellingForm(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setSelectedCollegeId(null);
        setReviewsOnly(false);
        setShowCounsellingForm(false);
    };

    const handleVerifiedReviewsClick = () => {
        if (user && user.college_id) {
            setSelectedCollegeId(user.college_id);
            setReviewsOnly(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (user) {
            alert("Please update your profile to select your college first.");
        } else {
            alert("Please login or create a student account to read verified reviews.");
        }
    };

    // Routing Logic
    if (user?.role === 'college_admin') {
        return <CollegeDashboard user={user} onLogout={handleLogout} />;
    }

    return (
        <div className="min-h-screen bg-white">
            <Header
                onLogoClick={handleBackToHome}
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
            />
            {showCounsellingForm ? (
                <CounsellingForm onBack={handleBackFromCounselling} />
            ) : selectedCollegeId ? (
                <CollegeDetail collegeId={selectedCollegeId} onBack={handleBackToHome} user={user} onLogin={handleLogin} reviewsOnly={reviewsOnly} />
            ) : (
                <>
                    <HeroSection onGetCounselling={handleGetCounselling} />
                    <BrowseSection onVerifiedReviewsClick={handleVerifiedReviewsClick} />
                    <TopColleges onCollegeClick={handleCollegeClick} />
                </>
            )}
        </div>
    );
}

