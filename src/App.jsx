import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CreatePost, EditProfile, HomePage, Login, Other, Profile, Register, Search, Setting, UpdatePassword } from './pages'
import { AuthProtection, LowBar, NavBar, ProtectedRoute, SideBar } from './components'
function App() {
  return (
    <Router>
      <div className='min-[591px]:flex overflow-hidden'>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <section className=' w-1/5 border-r-2 min-h-screen relative max-[944px]:w-48 max-[591px]:hidden'>
                <NavBar />
              </section>
              <section className='w-3/5 max-[944px]:w-3/4 max-[591px]:w-full max-[591px]:mb-14'>
                <HomePage />
              </section>
              <section className='w-1/4  min-h-screen relative max-[944px]:hidden'>
                <SideBar />
              </section>
              <section className='w-full min-[591px]:hidden'>
                <LowBar/>
              </section>
            </ProtectedRoute>
          } />
          <Route path='/setting' element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          } />
          <Route path='/updatePassword' element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute>
              <section className=' w-1/5 border-r-2 min-h-screen relative max-[944px]:w-48 max-[591px]:hidden'>
                <NavBar />
              </section>
              <section className='w-3/4 max-[591px]:w-full'>
                <Profile />
              </section>
              <section className='w-full min-[591px]:hidden'>
                <LowBar/>
              </section>
            </ProtectedRoute>
          } />
          <Route path='/user/:name' element={
            <ProtectedRoute>
              <section className=' w-1/5 border-r-2 min-h-screen relative max-[944px]:w-48 max-[591px]:hidden'>
                <NavBar />
              </section>
              <section className='w-3/4 max-[591px]:w-full'>
                <Other />
              </section>
              <section className='w-full min-[591px]:hidden'>
                <LowBar/>
              </section>
            </ProtectedRoute>
          } />
          <Route path='/search' element={
            <ProtectedRoute>
              <section className=' w-1/5 border-r-2 min-h-screen relative max-[944px]:w-48 max-[591px]:hidden'>
                <NavBar />
              </section>
              <section className='w-3/4 max-[591px]:w-full'>
                <Search />
              </section>
              <section className='w-full min-[591px]:hidden'>
                <LowBar/>
              </section>
            </ProtectedRoute>
          } />
          <Route path='/editProfile' element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } />
          <Route path='/register' element={
            <AuthProtection path={'/'}>
              <Register />
            </AuthProtection>
          } />
          <Route path='/auth' element={
            <AuthProtection path={'/'}>
              <Login />
            </AuthProtection>
          } />
          <Route path='/createPost' element={
            <ProtectedRoute>
              <section className='w-1/5 border-r-2 min-h-screen  relative max-[944px]:w-48 max-[591px]:hidden'>
                <NavBar />
              </section>
              <section className='w-3/4 max-[591px]:w-full max-[591px]:my-14'>
                <CreatePost />
              </section>
              <section className='w-full min-[591px]:hidden'>
                <LowBar/>
              </section>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
