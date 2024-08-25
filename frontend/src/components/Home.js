import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useConsultas } from '../contexts/ConsultaContext';
import Logo from '../Logo.png';
import AgendarConsulta from './AgendarConsulta';

const Home = () => {
    const [abrirModal, setAbrirModal] = useState(false);
    const navigate = useNavigate();
    const acaoAbrirModal = () => setAbrirModal(true);
    const acaoFecharModal = () => setAbrirModal(false);
    const { consultas, desmarcarConsulta, atualizarConsultasUsuarios, idUsuario, usuario } = useConsultas();

    useEffect(() => {
        if (idUsuario) {
            atualizarConsultasUsuarios()
        }
    }, [idUsuario]);

    const acaoDesconectar = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Ao confirmar, você será desconectado e será redirecionado para tela de login.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#49B4BB",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
                swalWithBootstrapButtons.fire({
                    title: "Desconectado!",
                    text: "Você foi desconectado com sucesso.",
                    icon: "success"
                });
            }
        });
    };

    const colunas = [
        {
            field: 'especialidadeNome',
            headerName: 'Especialidades',
            flex: 3,
        },
        {
            field: 'medicoNome',
            headerName: 'Profissional',
            flex: 4
        },
        {
            field: 'data',
            headerName: 'Data',
            flex: 2,
        },
        {
            field: 'hora',
            headerName: 'Hora',
            flex: 2
        },
        {
            field: 'actions',
            sortable: false,
            headerName: '',
            flex: 3,
            renderCell: (row) => (
                <Button color="primary" sx={{
                    color: "#49B4BB",
                    fontSize: '16px',
                    textAlign: 'center',
                    fontWeight: 400,
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#FFFFFF',
                    },
                }} onClick={() => desmarcarConsulta(row.id)} startIcon={<CloseIcon />}>
                    Desmarcar
                </Button>
            ),
        },
    ];
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Typography variant="h6" gutterBottom sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Consulta medica
                </Typography>
            </GridToolbarContainer>
        );
    }
    return (
        <Container>
            <Box sx={{ maxWidth: 900, margin: '0 auto', mt: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <img src={Logo} alt="Logo" style={{ marginRight: '8px', marginLeft: '15px' }} />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1" sx={{ color: '#a0a0a0', marginRight: 7, fontSize: '18px' }}>
                            {usuario}
                        </Typography>
                        <Button
                            sx={{
                                color: '#49B4BB',
                                fontSize: '18px',
                                textTransform: 'none',
                                marginRight: 2,
                                '&:hover': { color: '#40a4a6' },
                            }}
                            onClick={acaoDesconectar}
                        >
                            Desconectar
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ padding: 2 }}>
                    <Paper elevation={1} sx={{ padding: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Consulta Clínica</Typography>
                            <Button
                                sx={{
                                    backgroundColor: "#49B4BB",
                                    fontSize: '18px',
                                    minWidth: "200px",
                                    lineHeight: '21.09px',
                                    textTransform: 'none',
                                    '&:hover': { backgroundColor: '#40a4a6' },
                                }}
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={acaoAbrirModal}
                            >
                                Nova Consulta
                            </Button>
                            {abrirModal && <AgendarConsulta open={abrirModal} onClose={acaoFecharModal} />}
                        </Box>
                        <Box sx={{ height: 400, width: '100%' }}>
                            {consultas.length === 0 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%',
                                        width: '100%',
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <Typography variant="body1" color="textSecondary">
                                        Nenhuma consulta encontrada
                                    </Typography>
                                </Box>
                            ) : (
                                <DataGrid
                                    rows={consultas}
                                    columns={colunas}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    rowSelection={false}
                                    hideFooter
                                    components={{
                                        Toolbar: CustomToolbar,
                                    }}
                                    getRowClassName={(params) =>
                                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
                                    }
                                />
                            )}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    )
}

export default Home;