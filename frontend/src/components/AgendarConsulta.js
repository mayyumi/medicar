import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useConsultas } from '../contexts/ConsultaContext';
import { buscarAgendas, buscarEspecialidades, buscarMedicos } from '../services/apiServices';

const AgendarConsulta = ({ open, onClose }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [especialidades, setEspecilidades] = useState([])
    const [medicos, setMedicos] = useState([]);
    const [datas, setDatas] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [agendas, setAgendas] = useState([])

    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null);
    const [medicoSelecionado, setMedicoSelecionado] = useState(null);
    const [dataSelecionada, setDataSelecionada] = useState(null);
    const [horaSelecionada, setHoraSelecionada] = useState(null);

    const { consultas, addConsulta, atualizarConsultasUsuarios, idUsuario } = useConsultas();
    const [medicosFiltrados, setMedicosFiltrados] = useState([]);

    useEffect(() => {
        if (open) {
            Promise.all([
                buscarEspecialidades(),
                buscarMedicos(),
                buscarAgendas(),
            ]).then((res) => {
                setEspecilidades(res[0]);
                setMedicos(res[1])
                setAgendas(res[2])
            }).catch((err) => {
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [open]);

    useEffect(() => {
        if (especialidadeSelecionada) {
            const medicosFiltrados = medicos.filter(medico => medico.especialidade.id === especialidadeSelecionada);
            setMedicosFiltrados(medicosFiltrados);
        } else
            setMedicosFiltrados([])
        setLoading(false);

    }, [especialidadeSelecionada, medicos]);

    useEffect(() => {
        if (medicoSelecionado) {
            const agendasDoMedico = agendas.find(agenda => agenda.medico?.id === medicoSelecionado);
            if (agendasDoMedico) {
                setDatas([agendasDoMedico.dia]);
                setHorarios(agendasDoMedico.horarios);
                setLoading(false);
            } else {
                setDatas([]);
                setHorarios([]);
            }
        } else {
            setDatas([]);
            setHorarios([])
        }
    }, [medicoSelecionado, agendas]);

    const confirmarConsulta = async () => {
        const consultaExistente = consultas.find(
            consulta =>
                consulta.especialidadeId === especialidadeSelecionada &&
                consulta.data === dataSelecionada &&
                consulta.hora === horaSelecionada
        );
        if (consultaExistente) {
            Swal.fire({
                icon: "error",
                title: "Atenção!",
                text: "Você já tem uma consulta agendada com o mesmo especialista e horário."
            });
            onClose();
            return;
        }
        const novoAgendamento = {
            especialidadeId: especialidadeSelecionada,
            medicoId: medicoSelecionado,
            data: dataSelecionada,
            horario: horaSelecionada,
            userId: idUsuario
        };
        try {
            await addConsulta(novoAgendamento);
            atualizarConsultasUsuarios();
            onClose();
        } catch (error) {
            console.error("Erro ao agendar consulta:", error);
        }
    };
    const validarFormulario = () => {
        return especialidadeSelecionada &&
            medicoSelecionado &&
            dataSelecionada &&
            horaSelecionada;
    };

    const cancelarConsulta = () => {
        setEspecialidadeSelecionada('');
        setMedicoSelecionado('');
        setDataSelecionada('');
        setHoraSelecionada('');
        onClose();
    };

    return (
        <Modal open={open} onClose={cancelarConsulta}>
            <Box sx={{ width: 500, padding: 3, margin: '0 auto', mt: 5, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                    Nova Consulta
                </Typography>

                <FormControl fullWidth margin="normal">
                    <InputLabel sx={{
                        color: '#a0a0a0',
                        '&.Mui-focused': {
                            color: '#a0a0a0',
                        },
                    }}
                    >
                        Especialidade
                    </InputLabel>
                    <Select
                        value={especialidadeSelecionada}
                        onChange={(e) => setEspecialidadeSelecionada(e.target.value)}
                        label="Especialidade"
                        sx={{
                            color: 'black',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#49B4BB',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#40a4a6',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#49B4BB',
                            },
                        }}
                    >
                        {especialidades.map((specialty) => (
                            <MenuItem key={specialty.id} value={specialty.id}>
                                {specialty.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <FormControl fullWidth margin="normal">
                    <InputLabel sx={{
                        color: '#a0a0a0',
                        '&.Mui-focused': {
                            color: '#a0a0a0',
                        },
                    }}
                    >
                        Medicos
                    </InputLabel>
                    <Select
                        label={"Medicos"}
                        value={medicoSelecionado || ''}
                        onChange={(e) => setMedicoSelecionado(e.target.value)}
                        disabled={!especialidadeSelecionada}
                        sx={{
                            color: 'black',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#49B4BB',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#40a4a6',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#49B4BB',
                            },
                        }}
                    >
                        {medicosFiltrados.map((medico) => (
                            <MenuItem key={medico.id} value={medico.id}>
                                {medico.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel
                        sx={{
                            color: '#a0a0a0',
                            '&.Mui-focused': {
                                color: '#a0a0a0',
                            },
                        }}
                    >
                        Data
                    </InputLabel>
                    <Select
                        label="Data"
                        disabled={!medicoSelecionado}
                        value={dataSelecionada || ''}
                        onChange={(e) => setDataSelecionada(e.target.value)}
                        sx={{
                            color: 'black',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#49B4BB',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#40a4a6',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#49B4BB',
                            },
                        }}
                    >
                        {datas.map((data) => (
                            <MenuItem key={data} value={data}>
                                {data}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel
                        sx={{
                            color: '#a0a0a0',
                            '&.Mui-focused': {
                                color: '#a0a0a0',
                            },
                        }}
                    >
                        Hora
                    </InputLabel>
                    <Select
                        disabled={!dataSelecionada}
                        value={horaSelecionada}
                        onChange={(e) => setHoraSelecionada(e.target.value)}
                        label="Hora"
                        sx={{
                            color: 'black',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#49B4BB',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#40a4a6',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#49B4BB',
                            },
                        }}
                    >
                        {horarios.map((time) => (
                            <MenuItem key={time} value={time}>
                                {time}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ mt: 2 }}>
                    <Button
                        sx={{
                            left: '4rem',
                            color: "#49B4BB",
                            fontSize: '18px',
                            textAlign: 'center',
                            fontWeight: 700,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#FFFFFF',
                            },
                        }}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        sx={{
                            left: '12.5rem',
                            backgroundColor: "#49B4BB",
                            fontSize: '18px',
                            fontWeight: "700",
                            minWidth: "200px",
                            borderRadius: '8px',
                            minHeight: "40px",
                            lineHeight: '21.09px',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#40a4a6',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: '#D9F1F3',
                                color: '#ffffff',
                            }
                        }}
                        type="submit"
                        disabled={!validarFormulario()}
                        variant="contained"
                        onClick={() => confirmarConsulta()}
                    >
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AgendarConsulta;
