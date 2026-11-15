import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';
import Login from './pages/Login';
import SinPermiso from './pages/SinPermiso';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route element={<PrivateRoute rol="ADMIN" />}>
          <Route path="/libros/nuevo" element={<LibroNuevo />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sin-permiso" element={<SinPermiso />} />
      </Routes>
    </Layout>
  );
}
