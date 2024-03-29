import axios from "axios";

export var loadCertificates = (params, callback) => async (dispatch, getState) => {
    var config = {
        url: '/Certificates',
        params,
        headers: { authorization: getState().appState.token }
    };
    var result = await axios.request(config);
    console.log("api dostalo", result.data);
    callback(result.data);
};

export var loadCertificate = (id, callback) => async (dispatch, getState) => {
    var config = {
        url: `/Certificates/${id}`,
        data: {
            certificate: { id: id }
        },
        headers: { authorization: getState().appState.token }
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var saveCertificate = (resource, callback) => async (dispatch, getState) => {
    console.log("saveCertificate")
    var config = {
        url: resource.id ? `/Certificates/${resource.id}` : '/Certificates',
        method: resource.id ? 'PUT' : 'POST',
        data: {
            user: resource
        },
        headers: { authorization: getState().appState.token }
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var deleteCertificate = (id, callback) => async (dispatch, getState) => {
    var config = {
        url: `/Certificates/${id}`,
        method: 'DEvarE',
        headers: { authorization: getState().appState.token }
    };
    await axios.request(config);
    callback();
};
