let data = [];
const pesos = document.querySelector("#pesos");
const idConvertir = document.querySelector("#idConvertir");
const btn = document.querySelector("#convertir");
const resultado = document.querySelector("#resultado");
const cargar = document.querySelector("#chart");

const getConversor = async () => {
    try {
        const res = await fetch("https://mindicador.cl/api");
        const json = await res.json();

        data = [json.dolar, json.euro];
    } catch (e) {
        console.log("Error Inesperado");
    }
};

const getResultado = async () => {
    resp = idConvertir.value;
    dinero = parseFloat(pesos.value);

    data.forEach((element) => {
        if (element.codigo == resp) {
            const valor_final = dinero / element.valor;
            resultado.innerHTML = `Resultado: $ ${valor_final.toFixed(2)}`;
            resultado.classList.add("show-result");
            var options = {
                series: [
                    {
                        name: element.codigo,
                        data: [10, 41, 35, 51, 49, 62, 100],
                    },
                ],
                chart: {
                    height: 350,
                    type: "line",
                    zoom: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "straight",
                },
                title: {
                    text: "Variacion del " + element.codigo + " de la semana pasada",
                    align: "left",
                },
                grid: {
                    row: {
                        colors: ["#f3f3f3", "transparent"],
                        opacity: 0.5,
                    },
                },
                xaxis: {
                    categories: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
                },
            };
            var chart = new ApexCharts(cargar, options);
            chart.render();
        }
    });
};

const init = async () => {
    await getConversor();
};

init();

btn.addEventListener("click", async () => {
    cargar.innerHTML = "";
    getResultado();
});
