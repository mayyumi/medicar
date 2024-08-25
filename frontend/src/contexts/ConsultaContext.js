import React, { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { buscarConsultasUsuario, desmarcarConsulta, agendarConsulta as inserirConsultas } from '../services/apiServices';

const ConsultasContext = createContext();

export const ConsultasProvider = ({ children }) => {
    const [consultas, setConsultas] = useState([]);
    const idUsuario = localStorage.getItem('userId');
    const usuario = localStorage.getItem('username');

    const atualizarConsultasUsuarios = async () => {
        try {
            const res = await buscarConsultasUsuario(idUsuario);
            const consultasTratadas = tratarConsultas(res);
            setConsultas(consultasTratadas);
        } catch (error) {
            console.error("Erro ao atualizar consultas:", error);
        }
    };

    const addConsulta = async (objeto) => {
        try {
            await inserirConsultas(objeto);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Consulta marcada com sucesso!",
                showConfirmButton: false,
                timer: 1500
            });
            atualizarConsultasUsuarios();

        } catch (error) {
            console.error("Erro ao adicionar consulta:", error);
        }
    };

    const acaoDesmarcarConsulta = async (id) => {
        try {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: true
            });
            swalWithBootstrapButtons.fire({
                title: "Você tem certeza?",
                text: "Você não será capaz de reverter isso!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, desmarque!",
                cancelButtonText: "Não, cancelar!",
                cancelButtonColor: "#d33",
                confirmButtonColor: "#49B4BB",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    desmarcarConsulta(id).then(() => {
                        atualizarConsultasUsuarios();
                    })
                    swalWithBootstrapButtons.fire({
                        title: "Desmarcada!",
                        text: "Sua consulta foi desmarcada.",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.error("Erro ao remover consulta:", error);
        }
    };

    const tratarConsultas = (consultas) => {
        return consultas.map(consulta => ({
            id: consulta.id,
            data: consulta.dia,
            hora: consulta.horario,
            medicoId: consulta.medico.id || null,
            medicoNome: consulta.medico?.nome || 'N/A',
            especialidadeNome: consulta.medico?.especialidade?.nome || 'N/A',
            especialidadeId: consulta.medico?.especialidade.id || null
        }));
    };


    return (
        <ConsultasContext.Provider value={{ consultas, setConsultas, atualizarConsultasUsuarios, desmarcarConsulta: acaoDesmarcarConsulta, addConsulta, idUsuario, usuario }}>
            {children}
        </ConsultasContext.Provider>
    );
};

export const useConsultas = () => useContext(ConsultasContext);
