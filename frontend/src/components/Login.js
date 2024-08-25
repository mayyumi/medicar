import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConsultas } from '../contexts/ConsultaContext';
import Logo from '../Logo.png';
import { login } from '../services/apiServices';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarSenha, setLembrarSenha] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();
  const { setConsultas } = useConsultas();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('savedUsername');
    const senhaSalva = localStorage.getItem('savedPassword');
    if (usuarioSalvo && senhaSalva) {
      setUsuario(usuarioSalvo);
      setSenha(senhaSalva);
      setLembrarSenha(true);
    }
  }, []);

  const logar = async (event) => {
    event.preventDefault();
    setConsultas([])
    try {
      const data = await login(usuario, senha);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', usuario);
      if (lembrarSenha) {
        localStorage.setItem('savedUsername', usuario);
        localStorage.setItem('savedPassword', senha);
      } else {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
      }
      setConsultas([])
      navigate('/home');
    } catch (error) {
      setError('Credenciais inválidas');
    }
  };

  const acaoMostrarSenha = () => {
    setMostrarSenha((prev) => !prev);
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 20 }}>
        <Typography align='justify' variant="h4" gutterBottom>
          <img src={Logo} alt="Logo" />
        </Typography>
        <form onSubmit={logar}>
          <TextField
            label="Email ou Login"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            InputProps={{
              sx: {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#49B4BB',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#49B4BB',
                }
              },
            }} InputLabelProps={{
              sx: {
                '&.Mui-focused': {
                  color: '#a0a0a0',
                },
              },
            }}
          />
          <TextField
            label="Senha"
            type={mostrarSenha ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={acaoMostrarSenha}
                    edge="end"
                  >
                    {mostrarSenha ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#49B4BB',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#49B4BB',
                },
              },
            }}
            InputLabelProps={{
              sx: {
                '&.Mui-focused': {
                  color: '#a0a0a0',
                },
              },
            }}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={lembrarSenha}
                  onChange={(e) => setLembrarSenha(e.target.checked)}
                  sx={{
                    color: '#a0a0a0',
                    '&.Mui-checked': {
                      color: '#49B4BB',
                    },
                  }}
                  style={{ left: 2 }}
                />
              }
              label="Lembrar minha senha"
            />
          </FormGroup>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, mt: 2 }}>
            <Button
              sx={{
                color: "#49B4BB",
                fontSize: '18px',
                textAlign: 'center',
                right: '15px',
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#FFFFFF',
                },
              }}
              onClick={() => navigate('/cadastro')}
            >
              Criar Conta
            </Button>
            <Button
              sx={{
                left: '40px',
                backgroundColor: "#49B4BB",
                fontSize: '18px',
                minWidth: "180px",
                borderRadius: "8px",
                fontWeight: "700",
                size: "18px",
                lineHeight: '21.09px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#40a4a6',
                },
              }}
              type="submit"
              variant="contained"
            >
              Acessar
            </Button>
          </Box>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </Box>
    </Container>
  );
};

export default Login;
