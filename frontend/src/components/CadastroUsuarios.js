import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../Logo.png';
import { cadastrarUsuario } from '../services/apiServices';

const CadastroUsuarios = () => {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState(null);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarSenhaConfirmada, setMostrarSenhaConfirmada] = useState(false);
    const navigate = useNavigate();

    const acaoMostrarSenha = () => {
        setMostrarSenha(prev => !prev);
    };

    const acaoMostrarSenhaConfirmada = () => {
        setMostrarSenhaConfirmada(prev => !prev);
    };

    const acaoCadastrarUsuario = async (event) => {
        event.preventDefault();
        if (senha !== confirmarSenha) {
            setError('As senhas não correspondem');
            return;
        }
        try {
            await cadastrarUsuario(usuario, email, senha);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Conta criada com sucesso!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/")
        } catch (error) {
            setError('Já existe uma conta com esse usuário/email.');
        }
    };

    return (
        <Container>
            <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 20 }}>
                <Typography align='justify' variant="h4" gutterBottom>
                    <img src={Logo} alt="Logo" />
                </Typography>
                <form onSubmit={acaoCadastrarUsuario}>
                    <TextField
                        label="Nome"
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
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        variant="outlined"
                        type={mostrarSenha ? 'text' : 'password'}
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
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#49B4BB',
                                },
                                '&.Mui-focused': {
                                    color: '#a0a0a0',
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Confirmar Senha"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        type={mostrarSenhaConfirmada ? 'text' : 'password'}
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={acaoMostrarSenhaConfirmada}
                                        edge="end"
                                    >
                                        {mostrarSenhaConfirmada ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, position: "relative", gap: 6 }}>
                        <Button
                            sx={{
                                color: "#49B4BB",
                                fontSize: '18px',
                                textAlign: 'center',
                                right: '30px',
                                fontWeight: 700,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#FFFFFF',
                                },
                            }}
                            onClick={() => navigate('/')}
                        >
                            Cancelar
                        </Button>
                        <Button
                            sx={{
                                left: '38px',
                                backgroundColor: "#49B4BB",
                                fontSize: '18px',
                                fontWeight: "700",
                                size: "18px",
                                minWidth: "180px",
                                lineHeight: '21.09px',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#40a4a6',
                                },
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Confirmar
                        </Button>
                    </Box>
                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                </form>
            </Box>
        </Container>
    );
};

export default CadastroUsuarios;
