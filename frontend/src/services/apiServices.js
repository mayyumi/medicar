import axios from 'axios';

const API_URL = 'http://localhost:3000';
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const buscarMedicos = async () => {
  try {
    const response = await axios.get(`${API_URL}/medicos`, {
      headers: {
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Medicos:', error);
    throw error;
  }
};

export const buscarConsultas = async () => {
  try {
    const response = await axios.get(`${API_URL}/consultas`, {
      headers: {
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    throw error;
  }
};

export const buscarConsultasUsuario = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/consultas`, {
      params: { userId: id },
      headers: {
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    throw error;
  }
};

export const buscarAgendas = async () => {
  try {
    const response = await axios.get(`${API_URL}/agendas`, {
      headers: {
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar agendas:', error);
    throw error;
  }
};

export const desmarcarConsulta = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/consultas/${id}`, {
      headers: {
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao desmarcar consulta:', error);
    throw error;
  }
};


export const buscarEspecialidades = async () => {
  try {
    const response = await axios.get(`${API_URL}/especialidades`, {
      headers: {
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error);
    throw error;
  }
};

export const agendarConsulta = async (objeto) => {
  try {
    const response = await axios.post(
      `${API_URL}/consultas`,
      {
        especialidadeId: objeto.especialidadeId,
        medicoId: objeto.medicoId,
        data: objeto.data,
        horario: objeto.horario,
        userId: objeto.userId
      },
      {
        headers: {
          'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar a consulta:", error);
    throw error;
  }
};

export const cadastrarUsuario = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/users`, {
    username,
    email,
    password,
  });
  return response.data;
};
