// ============================================================
// Cimplast · datos.js
// Plantas, equipos, técnicos y URL de la API
// Actualizar con la lista maestra cada vez que cambien los equipos
// ============================================================

window.CIMPLAST_DATA = (function() {

  const API = 'https://script.google.com/macros/s/AKfycbwCDsgevdtDam9TwyTqKRj_4cGA7MELT9ZvPKDdnwv2qZs8ocl1Cfkmdv0Q4Z51BShDQQ/exec';

  const PLANTAS = ["Planta 3", "Planta 4", "Planta 5", "Titese", "Matricería", "Otros"];

  const EQUIPOS = {
  "Planta 3": [
    {
      "cod": "INY 3",
      "nombre": "Inyectora Negri Bossi"
    },
    {
      "cod": "INY 4",
      "nombre": "Inyectora Husky 1"
    },
    {
      "cod": "INY 5",
      "nombre": "Inyectora Husky 2"
    },
    {
      "cod": "INY 6",
      "nombre": "Inyectora Husky 3"
    },
    {
      "cod": "INY 7",
      "nombre": "Inyectora Husky 4"
    },
    {
      "cod": "INY 14",
      "nombre": "Inyectora Husky 6"
    },
    {
      "cod": "INS 01",
      "nombre": "Inyecto-Sopladora Automa"
    },
    {
      "cod": "INS 02",
      "nombre": "Inyecto-Sopladora Nissei 70/5"
    },
    {
      "cod": "INS 03",
      "nombre": "Inyecto-Sopladora Nissei 250/1"
    },
    {
      "cod": "INS 05",
      "nombre": "Inyecto-Sopladora Nissei 70/2"
    },
    {
      "cod": "INS 06",
      "nombre": "Inyecto-Sopladora Nissei 70/3"
    },
    {
      "cod": "INS 07",
      "nombre": "Inyecto-Sopladora Nissei 250/2"
    },
    {
      "cod": "CHI 22",
      "nombre": "Chiller Trane 50 TR - Planta 3"
    },
    {
      "cod": "CAA 2",
      "nombre": "Compresor Reavell (Booster)"
    },
    {
      "cod": "CAA 3",
      "nombre": "Compresor ABC 01"
    },
    {
      "cod": "CAA 4",
      "nombre": "Compresor ABC 02"
    },
    {
      "cod": "CAA 5",
      "nombre": "Compresor Shangair 2 (de 3 compresores)"
    },
    {
      "cod": "CAA 6",
      "nombre": "Compresor Shangair 3 (de 4 compresores)"
    },
    {
      "cod": "CAB 5",
      "nombre": "Compresor ATLAS COPCO GA 90"
    },
    {
      "cod": "Trafo 6",
      "nombre": "Trafo de potencia de 1.250KVA"
    },
    {
      "cod": "Trafo 2",
      "nombre": "Trafo de potencia de 1.000KVA"
    },
    {
      "cod": "Trafo 4",
      "nombre": "Trafo de potencia de 400 KVA"
    },
    {
      "cod": "Trafo 5",
      "nombre": "Trafo de potencia de 750 kVA"
    },
    {
      "cod": "CAB 4",
      "nombre": "Compresor Kaeser Planta 3"
    },
    {
      "cod": "CAB 10",
      "nombre": "Compresor Kaeser 2 planta 3"
    },
    {
      "cod": "INY 13",
      "nombre": "Inyectora Husky 5 XL 300"
    },
    {
      "cod": "CHI 33",
      "nombre": "Chiller Blauwer 1 Planta 3"
    },
    {
      "cod": "CHI 34",
      "nombre": "Chiller Blauwer 2 Planta 3"
    },
    {
      "cod": "CHI 35",
      "nombre": "Chiller Bluwer 3 Planta 3"
    },
    {
      "cod": "CHI 36",
      "nombre": "Chiller Bluwer 4 Planta 3"
    },
    {
      "cod": "CAB 14",
      "nombre": "Compresor Atlas Copco GA 45"
    },
    {
      "cod": "SOP30",
      "nombre": "Ekou 5"
    },
    {
      "cod": "INY11",
      "nombre": "Inyecto Sopladora AOKI"
    },
    {
      "cod": "LEC01",
      "nombre": "Lechita - Embal"
    },
    {
      "cod": "OTR",
      "nombre": "Otro"
    }
  ],
  "Planta 4": [
    {
      "cod": "INY 9",
      "nombre": "Inyectora Sandretto 2"
    },
    {
      "cod": "INY 10",
      "nombre": "Inyectora Sandretto 3"
    },
    {
      "cod": "INY 11",
      "nombre": "Inyectora Sandretto 4"
    },
    {
      "cod": "INY 12",
      "nombre": "Inyectora Sandretto 5"
    },
    {
      "cod": "CHI 1",
      "nombre": "Chiller Termo Regulador SACMI - Planta 4"
    },
    {
      "cod": "CHI 27",
      "nombre": "Chiller York 50 TR - Planta 4"
    },
    {
      "cod": "CAB 12",
      "nombre": "Compresor de Aire Atlas Copco GA 45"
    },
    {
      "cod": "Trafo 3",
      "nombre": "Transformador de 750KVA"
    },
    {
      "cod": "CCM 3",
      "nombre": "SACMI CCM 3"
    },
    {
      "cod": "INY 15",
      "nombre": "Borche"
    },
    {
      "cod": "OTR",
      "nombre": "Otro"
    }
  ],
  "Planta 5": [
    {
      "cod": "SOP 16",
      "nombre": "Ekou 1"
    },
    {
      "cod": "SOP 17",
      "nombre": "Ekou 2"
    },
    {
      "cod": "SOP 18",
      "nombre": "Ekou 3"
    },
    {
      "cod": "SOP 20",
      "nombre": "MAG PLASTIC 2"
    },
    {
      "cod": "SOP 21",
      "nombre": "MAG PLASTIC 4"
    },
    {
      "cod": "SOP 22",
      "nombre": "MAG PLASTIC 3"
    },
    {
      "cod": "SOP 26",
      "nombre": "Pavan 6"
    },
    {
      "cod": "SOP",
      "nombre": "Ekou 4"
    },
    {
      "cod": "CHI 15",
      "nombre": "Chiller Reiken 10 TR Nissei 70/2 y 3 - Planta 2"
    },
    {
      "cod": "CHI 23",
      "nombre": "Chiller Piovan 25 TR - Planta 2"
    },
    {
      "cod": "CAA 1",
      "nombre": "Compresor Ingersoll Rand PHE-NL"
    },
    {
      "cod": "Trafo 7",
      "nombre": "Trafo de potencia de 1.000KVA"
    },
    {
      "cod": "SOP31",
      "nombre": "Ekou 6"
    },
    {
      "cod": "SOP32",
      "nombre": "Ekou 7"
    },
    {
      "cod": "OTR",
      "nombre": "Otro"
    }
  ],
  "Titese": [
    {
      "cod": "SOP 1",
      "nombre": "Pavan Zanetti 1"
    },
    {
      "cod": "SOP 2",
      "nombre": "Pavan Zanetti 2"
    },
    {
      "cod": "SOP 3",
      "nombre": "Krupp"
    },
    {
      "cod": "SOP 4",
      "nombre": "Battenfeld Pugliese"
    },
    {
      "cod": "SOP 5",
      "nombre": "Plastiblow 1"
    },
    {
      "cod": "SOP 6",
      "nombre": "Plastiblow 2"
    },
    {
      "cod": "SOP 7",
      "nombre": "Plastiblow 3"
    },
    {
      "cod": "SOP 12",
      "nombre": "Bekum 2"
    },
    {
      "cod": "SOP 13",
      "nombre": "Pavan Zanetti 4"
    },
    {
      "cod": "SOP 24",
      "nombre": "UNILOY 2 - 20 lts"
    },
    {
      "cod": "SOP 25",
      "nombre": "UNILOY 1 - 5 lts"
    },
    {
      "cod": "SOP26",
      "nombre": "Sopladora Multipack 1"
    },
    {
      "cod": "CHI 29",
      "nombre": "Chiller York 120 TR - Titese"
    },
    {
      "cod": "CHI 30",
      "nombre": "Chiller Blauwer 1 50 TR - Titese"
    },
    {
      "cod": "CHI 31",
      "nombre": "Chiller Blauwer 2 50 TR - Titese"
    },
    {
      "cod": "Trafo 8",
      "nombre": "Trafo de potencia 1 de 1.000KVA titese"
    },
    {
      "cod": "Trafo 9",
      "nombre": "Trafo de potencia 2 de 1.000KVA titese"
    },
    {
      "cod": "CAB 9",
      "nombre": "Compresor Kaeser 1 TITESE"
    },
    {
      "cod": "CAB 11",
      "nombre": "Compresor Kaeser 3 TITESE"
    },
    {
      "cod": "SOP27",
      "nombre": "Sopladora Multipack 2"
    },
    {
      "cod": "SOP28",
      "nombre": "Sopladora Z"
    },
    {
      "cod": "CAB 8",
      "nombre": "Compresor Kaeser 4 TITESE"
    },
    {
      "cod": "CHI 37",
      "nombre": "Chiller Smart MK3 y MK4"
    },
    {
      "cod": "CAB 13",
      "nombre": "Compresor Atlas Copco GA 160"
    },
    {
      "cod": "SOP29",
      "nombre": "Sopladora Multipack 3"
    },
    {
      "cod": "SOP 30",
      "nombre": "Sopladora Multipack 4"
    },
    {
      "cod": "OTR",
      "nombre": "Otro"
    }
  ],
  "Matricería": [
    {
      "cod": "MAT-01",
      "nombre": "Torno CNC 1"
    },
    {
      "cod": "MAT-02",
      "nombre": "Torno CNC 2"
    },
    {
      "cod": "MAT-03",
      "nombre": "Fresadora CNC"
    },
    {
      "cod": "MAT-04",
      "nombre": "Rectificadora"
    },
    {
      "cod": "MAT-05",
      "nombre": "Soldadora MIG"
    },
    {
      "cod": "MAT-06",
      "nombre": "Compresor Matricería"
    },
    {
      "cod": "OTR",
      "nombre": "Otro"
    }
  ],
  "Otros": [
    {
      "cod": "OTR-01",
      "nombre": "Caldera"
    },
    {
      "cod": "OTR-02",
      "nombre": "Planta de tratamiento de agua"
    },
    {
      "cod": "OTR-03",
      "nombre": "Generador eléctrico"
    },
    {
      "cod": "OTR-04",
      "nombre": "Puente grúa"
    }
  ]
};

  const TECNICOS = [
  {
    "id": 14,
    "nombre": "Carlos Mongelos",
    "esp": "Eléctrico"
  },
  {
    "id": 4,
    "nombre": "Claudio Cerezo",
    "esp": "Eléctrico"
  },
  {
    "id": 11,
    "nombre": "Edgar Maqueda",
    "esp": "Metricero"
  },
  {
    "id": 13,
    "nombre": "Enrique Monges",
    "esp": "Eléctrico"
  },
  {
    "id": 10,
    "nombre": "Jose Caballero",
    "esp": "Mecánico"
  },
  {
    "id": 2,
    "nombre": "José González",
    "esp": "Mecánico"
  },
  {
    "id": 16,
    "nombre": "Maximo Duarte",
    "esp": "Eléctrico"
  },
  {
    "id": 15,
    "nombre": "Nicolas Vazquez",
    "esp": "Mecánico"
  },
  {
    "id": 7,
    "nombre": "Oscar Duarte",
    "esp": "Electromecánico"
  },
  {
    "id": 6,
    "nombre": "Pablo Gomez",
    "esp": "Herrero"
  },
  {
    "id": 8,
    "nombre": "Valentin Escobar",
    "esp": "Herrero"
  },
  {
    "id": 12,
    "nombre": "Victor Saucedo",
    "esp": "Mecánico"
  },
  {
    "id": 17,
    "nombre": "Agustín Dure",
    "esp": "Electrónico"
  },
  {
    "id": 18,
    "nombre": "Jose Bogado",
    "esp": "Mecánico"
  },
  {
    "id": 19,
    "nombre": "Operador/Encargado",
    "esp": "Producción"
  },
  {
    "id": 20,
    "nombre": "Tercerizado",
    "esp": "Externo"
  }
];

  return {
    api: API,
    tecnicos: TECNICOS,

    listaPlantas() {
      return PLANTAS;
    },

    equiposDe(planta) {
      return EQUIPOS[planta] || [];
    },

    tieneTecnico(tecStr, query) {
      if (!tecStr || !query) return false;
      return tecStr.toLowerCase().includes(query.toLowerCase());
    },

    tecnicosDe(tecStr) {
      if (!tecStr) return [];
      return tecStr.split(',').map(t => t.trim()).filter(Boolean);
    },

    fmtFecha(iso) {
      if (!iso) return '—';
      const s = String(iso).slice(0, 10);
      const [y, m, d] = s.split('-');
      return d + '/' + m + '/' + y;
    },

    fmtFechaHora(fecha, hora) {
  const f = this.fmtFecha(fecha);
  if (!hora) return f;
  let h = String(hora);
  if (h.includes('T')) h = h.substring(11, 16); // formato ISO: extraer HH:mm
  else h = h.slice(0, 5);
  return f + ' ' + h;
}
  };
})();
