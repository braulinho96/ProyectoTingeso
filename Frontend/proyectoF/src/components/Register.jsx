import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user.service';

const Register = () => {
  const [rut, setRut] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Formateo del RUT
  const formatRut = (value) => {
    const cleaned = value.replace(/[^\dkK]/g, '');
    const limitedRut = cleaned.slice(0, 9); // Limita el tamaño máximo del RUT
    const rutPart = limitedRut.slice(0, -1);
    const dv = limitedRut.slice(-1);
    return rutPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.').concat('-', dv);
  };

  // Maneja el cambio del campo RUT con formateo
  const handleRutChange = (e) => {
    const value = e.target.value;
    setRut(formatRut(value));
  };

  // Registro del usuario
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess(''); 

    const user = { rut, name, password, solicitude_state: false, id_rol: 2 };

    try {
      await userService.create(user);
      setSuccess('Usuario registrado exitosamente.');
      setTimeout(() => navigate('/'), 100); // Redirige tras 2 segundos

    } catch (err) {
      setError('The rut is already registered.');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="RUT"
          value={rut}
          onChange={handleRutChange}
          maxLength={12}
          minLength={11}
          required
        />
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Registrar</button>
      </form>
      <p>
        ¿Ya tienes una cuenta?{' '}
        <button onClick={() => navigate('/')}>Iniciar sesión</button>
      </p>
    </div>
  );
};

export default Register;
