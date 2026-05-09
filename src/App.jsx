import { useMemo, useState } from 'react'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ReportPage from './pages/ReportPage'
import SignUpPage from './pages/SignUpPage'
import { INITIAL_USER } from './constants/mockData'
import './App.css'

function App() {

  const [screen, setScreen] = useState('landing')

  const [user, setUser] = useState(INITIAL_USER)

  /* 🔥 DUMMY DATA OFF */
  const [reports, setReports] = useState([])

  const greeting = useMemo(() => {
    if (!user.name) return 'Halo'
    return `Halo, ${user.name}`
  }, [user.name])

  /* LOGIN */
  const handleLogin = ({ username }) => {

    setUser((prev) => ({
      ...prev,
      name: username,
    }))

    setScreen('home')
  }

  /* SIGN UP */
  const handleSignUp = ({
    name,
    localEmail,
    password,
  }) => {

    const email = `${localEmail}@gmail.com`

    setUser((prev) => ({
      ...prev,
      name: name || prev.name,
      email,
      password,
    }))

    setScreen('login')
  }

  /* SUBMIT REPORT */
  const handleSubmitReport = (report) => {

    const newReport = {

      ...report,

      id: Date.now(),

      /* 🔥 PEMILIK LAPORAN */
      user: user.name,

      date: new Date().toLocaleDateString(
        'id-ID',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),

      status: 'Diproses',
    }

    setReports((prev) => [
      newReport,
      ...prev,
    ])

    setScreen('home')
  }

  /* HAPUS LAPORAN */
  const handleDeleteReport = (id) => {

    const confirmDelete = window.confirm(
      'Hapus laporan ini?'
    )

    if (!confirmDelete) return

    setReports((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  /* 🔥 KHUSUS LAPORAN USER LOGIN */
  const myReports = reports.filter(
    (item) => item.user === user.name
  )

  /* CARD STATS */
  const stats = [
    {
      label: 'Total Laporan',
      value: myReports.length,
    },

    {
      label: 'Diproses',
      value: myReports.filter(
        (item) =>
          item.status === 'Diproses'
      ).length,
    },

    {
      label: 'Selesai',
      value: myReports.filter(
        (item) =>
          item.status === 'Selesai'
      ).length,
    },

    {
      label: 'Ditolak',
      value: myReports.filter(
        (item) =>
          item.status === 'Ditolak'
      ).length,
    },
  ]

  const screens = {

    /* LANDING */
    landing: (
      <LandingPage
        onLogin={() => setScreen('login')}
        onSignup={() => setScreen('signup')}
      />
    ),

    /* LOGIN */
    login: (
      <LoginPage
        onSubmit={handleLogin}
        onSignup={() => setScreen('signup')}
        onBack={() => setScreen('landing')}
      />
    ),

    /* SIGN UP */
    signup: (
      <SignUpPage
        onSubmit={handleSignUp}
        onBack={() => setScreen('landing')}
      />
    ),

    /* HOME */
    home: (
      <HomePage
        greeting={greeting}

        stats={stats}

        reports={myReports}

        currentUser={user.name}

        onDeleteReport={handleDeleteReport}

        onCreateReport={() =>
          setScreen('report')
        }
      />
    ),

    /* REPORT */
    report: (
      <ReportPage
        onSubmit={handleSubmitReport}
        onBack={() => setScreen('home')}
      />
    ),

    /* PROFILE */
    profile: (
      <ProfilePage
        user={user}

        onBack={() => setScreen('home')}

        onLogout={() => {

          setScreen('landing')

          setUser(INITIAL_USER)
        }}
      />
    ),
  }

  return (
    <main className="app-shell">

      <div className="phone-frame">
        {screens[screen]}
      </div>

      {['home', 'report', 'profile'].includes(
        screen
      ) && (
        <BottomNav
          screen={screen}
          onNavigate={setScreen}
        />
      )}
    </main>
  )
}

export default App