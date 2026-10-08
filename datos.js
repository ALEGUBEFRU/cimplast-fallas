// ============================================================
// Cimplast · datos.js
// Plantas, equipos, técnicos y URL de la API
// Actualizar con la lista maestra cada vez que cambien los equipos
// ============================================================

window.CIMPLAST_DATA = (function() {

  const API = 'https://script.google.com/macros/s/AKfycbxTnbzhajqmiCZj_3KQzbkT9Ewp7Muj_k18RaH2jNrsVtUrR5PTd4hRVxHw965PgIhewA/exec';
  const TOKEN = 'BQJv4A6aO3Bu9C9oLMnVdymL1czkA6U4yv3vHqe5';

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
      "cod": "SOP 31",
      "nombre": "Ekou 5"
    },
    {
      "cod": "INS 09",
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
      "cod": "SOP 14",
      "nombre": "Pavan 6"
    },
    {
      "cod": "SOP 35",
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
      "cod": "SOP 32",
      "nombre": "Ekou 6"
    },
    {
      "cod": "SOP 33",
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
    token: TOKEN,
    tecnicos: TECNICOS,

    apiGet(params) {
      const qs = params ? '&' + params : '';
      // Cache-buster: evita que el navegador reutilice una respuesta vieja
      // (el redirect interno de Apps Script puede quedar cacheado por heurística
      // del navegador aunque el contenido final diga no-cache).
      const cacheBuster = '&_t=' + Date.now();
      return API + '?token=' + encodeURIComponent(TOKEN) + qs + cacheBuster;
    },

    apiPostBody(bodyObj) {
      return JSON.stringify(Object.assign({}, bodyObj, { token: TOKEN }));
    },

    // ── Llamadas a la API con tiempo límite y reintento ──
    // Apps Script a veces responde una página HTML de error de Google en vez de
    // JSON, o tarda de más. Antes eso se veía como "No se pudieron cargar los
    // planes" o una OT que quedaba en "Creando…". Ahora: 30 s de límite y hasta
    // 2 reintentos. Solo se reintenta lo que es seguro repetir (lecturas, y OT
    // gracias a reqId).
    async _pedir(url, opts, reintentos) {
      let ultimo;
      for (let intento = 0; intento <= reintentos; intento++) {
        if (intento) await new Promise(r => setTimeout(r, 1500 * intento));
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 30000);
        try {
          const r = await fetch(url, Object.assign({}, opts, { signal: ctrl.signal }));
          const txt = await r.text();
          if (!r.ok) throw new Error('El servidor respondió ' + r.status);
          if (txt.trim().charAt(0) === '<') throw new Error('Google devolvió una página de error — reintentá');
          return JSON.parse(txt);
        } catch (e) {
          ultimo = e.name === 'AbortError' ? new Error('El servidor tardó demasiado — reintentá') : e;
        } finally { clearTimeout(timer); }
      }
      throw ultimo;
    },
    apiJSON(params, reintentos = 2) {
      return this._pedir(this.apiGet(params), {}, reintentos);
    },
    apiPost(body, reintentos = 0) {
      return this._pedir(API, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: this.apiPostBody(body) }, reintentos);
    },

    listaPlantas() {
      return PLANTAS;
    },

    // Escape para insertar texto en HTML
    esc(s) {
      return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    },

    // Escape para pasar texto como argumento JS dentro de un atributo onclick="...".
    // esc() solo NO alcanza ahí: el navegador decodifica &#39; antes de ejecutar.
    jsa(s) {
      return this.esc(JSON.stringify(String(s ?? '')));
    },

    // Identificador único de cada envío — permite al servidor ignorar reintentos
    nuevoReqId() {
      if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
      return 'r-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
    },

    esAnulada(o) {
      return String(o.ObservacionesCierre || '').trim().toUpperCase().indexOf('ANULADA') === 0;
    },

    // ÚNICA fórmula de KPIs para todas las apps (antes Supervisores y Reporte
    // Ejecutivo calculaban MTBF distinto: 285 h vs 9 h para el mismo mes).
    // MTBF por equipo = horas del período × equipos con falla / fallas.
    // Las OT anuladas no cuentan ni como cerradas ni en el total.
    kpis(fallas, ots, dias) {
      const n = v => Number(v) || 0;
      const anuladas  = ots.filter(o => o.Estado === 'Cerrada' && this.esAnulada(o));
      const validas   = ots.filter(o => !(o.Estado === 'Cerrada' && this.esAnulada(o)));
      const cerradas  = validas.filter(o => o.Estado === 'Cerrada');
      const conHoras  = cerradas.filter(o => n(o.HorasReales) > 0);
      const mttr      = conHoras.length ? conHoras.reduce((a, o) => a + n(o.HorasReales), 0) / conHoras.length : 0;
      const nFallas   = fallas.length;
      const equiposConFalla = new Set(fallas.map(f => f.Equipo).filter(Boolean)).size || 1;
      const horasPeriodo = Math.max(1, dias) * 24;
      const mtbf      = nFallas ? (horasPeriodo * equiposConFalla) / nFallas : 0;
      const disp      = (mtbf + mttr) > 0 ? mtbf / (mtbf + mttr) * 100 : 100;
      const cumpl     = validas.length ? cerradas.length / validas.length * 100 : 0;
      return {
        mttr, mtbf, disp, cumpl, nFallas, equiposConFalla, dias: Math.max(1, dias),
        cerradas, conHoras, anuladas, validas,
        backlog: validas.filter(o => o.Estado !== 'Cerrada').length,
        costo: cerradas.reduce((a, o) => a + n(o.Costo), 0)
      };
    },

    // ── Costos de mantenimiento desde SAP (hoja "Costos SAP", carga manual mensual) ──
    // Una fila por línea de salida de mercadería. El costo del período es la suma
    // por Fecha_Emision (fecha de salida), NO por cierre de OT.
    async cargarCostos() {
      const r = await this.apiJSON('accion=costos');
      if (!r || r.ok === false) throw new Error((r && r.error) || 'No se pudo leer Costos SAP');
      // Backend viejo (sin la acción) o sin la hoja: se lanza error para que la tarjeta
      // use el costo de las OT en vez de mostrar un 0 engañoso.
      if (!Array.isArray(r.costos)) throw new Error('El servidor no tiene la acción costos: publicar la versión nueva de Apps Script');
      if (r.aviso) throw new Error(r.aviso);
      return r.costos;
    },

    // desde/hasta: 'YYYY-MM-DD' (vacíos = sin límite). planta: '' = todas.
    costoPeriodo(costos, desde, hasta, planta) {
      const n = v => Number(v) || 0;
      let total = 0, maquina = 0, areas = 0, lineas = 0;
      (costos || []).forEach(c => {
        // Base de imputación: fecha de creación de la llamada de servicio (si no viene, fecha de salida)
        const f = String(c.Fecha_Creacion_Llamada || c.Fecha_Emision || '').slice(0, 10);
        if (desde && f < desde) return;
        if (hasta && f > hasta) return;
        if (planta && c.Planta !== planta) return;
        const v = n(c.Costo_Total);
        total += v; lineas++;
        if (c.Tipo === 'Maquina') maquina += v; else areas += v;
      });
      return { total, maquina, planta: areas, lineas };
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

    // ── estadoVisible: texto de estado para MOSTRAR (Kanban, detalle, agenda, lista) ──
    // 1) Anulada: en el Sheet queda Estado=Cerrada + "ANULADA:" (y columna Anulada=Si),
    //    así Kanban y filtros no se rompen, pero en pantalla se ve "Anulada".
    // 2) OT abierta con motivo de espera: "Abierta — Aguardando repuestos".
    estadoVisible(o) {
      const estado = o.Estado || '—';
      if (estado === 'Cerrada' && (this.esAnulada(o) || String(o.Anulada) === 'Si')) return 'Anulada';
      const SUBESTADO_TXT = {
        'Aguardando repuestos': 'Aguardando repuestos',
        'Aguardando fecha de intervención': 'Aguardando fecha',
        'Sin técnico disponible': 'Sin técnico'
      };
      if (estado === 'Cerrada' || estado === 'Anulada' || !o.SubEstado) return estado;
      return estado + ' — ' + (SUBESTADO_TXT[o.SubEstado] || o.SubEstado);
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
