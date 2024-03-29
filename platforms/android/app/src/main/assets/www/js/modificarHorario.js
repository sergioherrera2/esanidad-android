if (sessionStorage.getItem("data") == null) {
    alert("no tienes acceso a esta vista");
    location.href = '../index.html'
} else {
    var dniMedico = JSON.parse(sessionStorage.getItem("dniMedico"));
    var tiempo = JSON.parse(sessionStorage.getItem("tiempo"));
    var inicio = JSON.parse(sessionStorage.getItem("inicio"));
    var fin = JSON.parse(sessionStorage.getItem("fin"));
    document.getElementById("dniMedico").value = dniMedico;
    document.getElementById("tiempoCita").value = tiempo;
    document.getElementById("horaInicio").value = inicio;
    document.getElementById("horaFin").value = fin;

    function modificarHorario() {
        var dniMedico = JSON.parse(sessionStorage.getItem("dniMedico"));
        var tiempo = JSON.parse(sessionStorage.getItem("tiempo"));
        var duracionNew = document.getElementById("tiempoCita").value;
        var inicio = JSON.parse(sessionStorage.getItem("inicio"));
        var horaInicioNew = document.getElementById("horaInicio").value;
        var fin = JSON.parse(sessionStorage.getItem("fin"));
        var horaFinNew = document.getElementById("horaFin").value;

        var recurso = "https://esanidad.herokuapp.com/modificarHorario";
        var data = {
            type: "modificar horario",
            dniMedico: dniMedico,
            duracionNew: duracionNew,
            duracionOld: tiempo,
            horaInicioNew: horaInicioNew,
            horaInicioOld: inicio,
            horaFinNew: horaFinNew,
            horaFinOld: fin
        };
        data = JSON.stringify(data);
        setTimeout($.ajax({
                url: recurso,
                type: "POST",
                data: data,
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .done(function(data, textStatus, jqXHR) {
                console.log(data.type);
                if (data.type == "OK") {
                    setTimeout(location.href = '../views/gestor.html', 10000);
                    sessionStorage.removeItem("tiempo");
                    sessionStorage.removeItem("inicio");
                    sessionStorage.removeItem("fin");
                } else {
                    if (data.type = "error") {
                        alert("Error al modificar el horario, contacte con el servicio de soporte.");
                        sessionStorage.removeItem("tiempo");
                        sessionStorage.removeItem("inicio");
                        sessionStorage.removeItem("fin");
                    }
                    sessionStorage.removeItem("tiempo");
                    sessionStorage.removeItem("inicio");
                    sessionStorage.removeItem("fin");
                }

            }), 10000);
    }
}

function cerrarSesion() {
    sessionStorage.removeItem("data");
    setTimeout(location.href = 'https://esanidad.herokuapp.com/', 10000);
}