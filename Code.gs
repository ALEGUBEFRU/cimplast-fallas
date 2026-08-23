// ============================================================
// Cimplast · Apps Script API
// Recibe datos desde la PWA/APK y los escribe en Google Sheets
// ============================================================

const SHEET_ID     = '1wOMCjdiE0zYbarR9FE-AJt3cWfugc_w5MWRMyybe-rw';
const SHEET_FALLAS = 'Fallas';
const SHEET_OTS    = 'OTs';

// ── TEAMS WEBHOOK (opcional) ─────────────────────────────
const TEAMS_WEBHOOK = '';

// ── EMAILS A NOTIFICAR ───────────────────────────────────
const EMAILS_ALERTA = [
  'gerenciatecnica@cimplast.com.py'
];

// ── CORS headers ─────────────────────────────────────────
function setCORSHeaders(output) {
  return output
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// ENDPOINT PRINCIPAL — recibe POST desde la app
// ============================================================
function doPost(e) {
  try {
    const raw = e.postData ? e.postData.contents : '{}';
    const data = JSON.parse(raw);
    const accion = data.accion || 'falla';

    let resultado;
    if (accion === 'falla') {
      resultado = guardarFalla(data);
    } else if (accion === 'ot') {
      resultado = guardarOT(data);
    } else if (accion === 'actualizarEstado') {
      resultado = actualizarEstado(data);
    } else if (accion === 'cerrarOT') {
      resultado = cerrarOT(data);
    } else if (accion === 'actualizarOT') {
      resultado = actualizarOT(data);
    } else if (accion === 'estadoFalla') {
      resultado = actualizarEstado({ id: data.id, estado: data.estado });
    } else if (accion === 'estadoOT') {
      resultado = estadoOT(data);
    } else {
      resultado = { ok: false, error: 'Acción desconocida: ' + accion };
    }

    return ContentService
      .createTextOutput(JSON.stringify(resultado))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET — consultar estado de reportes ───────────────────
function doGet(e) {
  try {
    const accion = e.parameter.accion || '';
    let resultado;

    if (accion === 'estados') {
      resultado = obtenerEstados(e.parameter.ids);
    } else if (accion === 'tecnicos') {
      resultado = obtenerTecnicos();
    } else if (accion === 'ots') {
      resultado = obtenerOTs(e.parameter.planta);
    } else if (accion === 'fallas') {
      resultado = obtenerFallas(e.parameter.planta);
    } else {
      resultado = { ok: true, msg: 'Cimplast API activa' };
    }

    return ContentService
      .createTextOutput(JSON.stringify(resultado))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

const DRIVE_FOLDER = 'Cimplast - Fallas';

// ============================================================
// GUARDAR FALLA
// ============================================================
function guardarFalla(data) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  let sheet   = ss.getSheetByName(SHEET_FALLAS);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_FALLAS);
    sheet.appendRow(['ID','Timestamp','Operador','Turno','Planta','Equipo',
                     'Sistema','Sintoma','Detenido','Fecha','Hora','CantFotos','Estado','FotoURL']);
    sheet.getRange(1,1,1,14).setFontWeight('bold').setBackground('#f59e0b');
  }

  const datos = sheet.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === data.id) return { ok: true, msg: 'Duplicado ignorado', id: data.id };
  }

  let fotoUrl = '';
  let fotoError = '';
  // La app envía fotos como array en data.fotos o como string en data.fotoBase64
  const fotoBase64 = (data.fotos && data.fotos.length > 0)
    ? data.fotos[0]
    : (data.fotoBase64 || '');
  if (fotoBase64 && fotoBase64.length > 100) {
    try {
      fotoUrl = subirFoto(fotoBase64, data.id, 'image/jpeg');
    } catch(e) {
      fotoError = e.toString();
      Logger.log('Error subiendo foto: ' + e);
    }
  }

  sheet.appendRow([
    data.id, data.timestamp, data.operador, data.turno, data.planta,
    data.equipo, data.sistema, data.sintoma, data.detenido,
    data.fecha, data.hora, data.cantFotos || 0, 'Pendiente', fotoUrl
  ]);

  notificarFalla(data);
  return { ok: true, id: data.id, estado: 'Pendiente', fotoUrl, fotoError };
}

// ============================================================
// SUBIR FOTO A GOOGLE DRIVE
// ============================================================
function subirFoto(base64Data, fallaId, mimeType) {
  let carpetas = DriveApp.getFoldersByName(DRIVE_FOLDER);
  let carpeta;
  if (carpetas.hasNext()) {
    carpeta = carpetas.next();
  } else {
    carpeta = DriveApp.createFolder(DRIVE_FOLDER);
  }

  const fecha = Utilities.formatDate(new Date(), 'America/Asuncion', 'yyyy-MM-dd');
  let subcarpetas = carpeta.getFoldersByName(fecha);
  let subcarpeta;
  if (subcarpetas.hasNext()) {
    subcarpeta = subcarpetas.next();
  } else {
    subcarpeta = carpeta.createFolder(fecha);
  }

  const cleanBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
  const blob = Utilities.newBlob(
    Utilities.base64Decode(cleanBase64),
    mimeType,
    fallaId + '.jpg'
  );

  const file = subcarpeta.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1000';
}

// ============================================================
// GUARDAR OT
// ============================================================
function guardarOT(data) {
  const ss  = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_OTS);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_OTS);
    sheet.appendRow(['NroOT','FallaID','Equipo','Planta','Tipo','Prioridad',
                     'Tecnico','Descripcion','HorasEstimada','FechaProgramada',
                     'Observaciones','Estado','FechaCreacion',
                     'HorasReales','Repuestos','Costo','ObservacionesCierre','FechaCierre']);
    sheet.getRange(1,1,1,18).setFontWeight('bold').setBackground('#16a34a').setFontColor('#fff');
  }

  sheet.appendRow([
    data.nroOT, data.fallaId || '', data.equipo, data.planta,
    data.tipo, data.prioridad, data.tecnico, data.descripcion,
    data.horasEstimadas || '', data.fechaProgramada || '',
    data.observaciones || '', 'Abierta', new Date().toISOString()
  ]);

  if (data.fallaId) {
    actualizarEstado({ id: data.fallaId, estado: 'En curso' });
  }

  return { ok: true, nroOT: data.nroOT };
}

// ============================================================
// ACTUALIZAR ESTADO DE FALLA
// ============================================================
function actualizarEstado(data) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_FALLAS);
  if (!sheet) return { ok: false, error: 'Hoja Fallas no encontrada' };

  const datos = sheet.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === data.id) {
      sheet.getRange(i + 1, 13).setValue(data.estado);
      const colores = { 'Pendiente': '#fff3cd', 'En curso': '#cce5ff', 'Concluido': '#d4edda' };
      sheet.getRange(i + 1, 1, 1, 13).setBackground(colores[data.estado] || '#fff');
      return { ok: true, id: data.id, estado: data.estado };
    }
  }
  return { ok: false, error: 'Falla no encontrada: ' + data.id };
}

// ============================================================
// OBTENER ESTADOS
// ============================================================
function obtenerEstados(idsStr) {
  if (!idsStr) return { ok: false, error: 'ids requerido' };
  const ids   = idsStr.split(',');
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_FALLAS);
  if (!sheet) return { ok: true, estados: {} };

  const datos   = sheet.getDataRange().getValues();
  const estados = {};
  for (let i = 1; i < datos.length; i++) {
    if (ids.includes(String(datos[i][0]))) {
      estados[datos[i][0]] = datos[i][12];
    }
  }
  return { ok: true, estados };
}

// ============================================================
// OBTENER TÉCNICOS
// ============================================================
function obtenerTecnicos() {
  const tecnicos = [
    { id: 14, nombre: 'Carlos Mongelos',  especialidad: 'Eléctrico',       planta: 'Planta 3' },
    { id:  4, nombre: 'Claudio Cerezo',   especialidad: 'Eléctrico',       planta: 'Planta 6' },
    { id: 11, nombre: 'Edgar Maqueda',    especialidad: 'Metricero',       planta: 'Matricería' },
    { id: 13, nombre: 'Enrique Monges',   especialidad: 'Eléctrico',       planta: 'Planta 6' },
    { id: 10, nombre: 'Jose Caballero',   especialidad: 'Mecánico',        planta: 'Planta 3' },
    { id:  2, nombre: 'José González',    especialidad: 'Mecánico',        planta: 'Titese' },
    { id: 16, nombre: 'Maximo Duarte',    especialidad: 'Eléctrico',       planta: 'Planta 6' },
    { id: 15, nombre: 'Nicolas Vazquez',  especialidad: 'Mecánico',        planta: 'Planta 3' },
    { id:  7, nombre: 'Oscar Duarte',     especialidad: 'Electromecánico', planta: 'Planta 3' },
    { id:  6, nombre: 'Pablo Gomez',      especialidad: 'Herrero',         planta: 'Planta 3' },
    { id:  8, nombre: 'Valentin Escobar', especialidad: 'Herrero',         planta: 'Planta 6' },
    { id: 12, nombre: 'Victor Saucedo',   especialidad: 'Mecánico',        planta: 'Planta 6' },
    { id: 17, nombre: 'Agustín Dure',     especialidad: 'Electrónico',     planta: '' },
    { id: 18, nombre: 'Jose Bogado',      especialidad: 'Mecánico',        planta: '' },
    { id: 19, nombre: 'Operador/Encargado', especialidad: 'Producción',    planta: '' },
    { id: 20, nombre: 'Tercerizado',      especialidad: 'Externo',         planta: '' },
  ];
  return { ok: true, tecnicos };
}

// ============================================================
// CAMBIAR ESTADO DE OT (drag & drop desde Kanban)
// ============================================================
function estadoOT(data) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_OTS);
  if (!sheet) return { ok: false, error: 'Hoja OTs no encontrada' };

  const datos   = sheet.getDataRange().getValues();
  const headers = datos[0];
  const colNroOT  = headers.indexOf('NroOT');
  const colEstado = headers.indexOf('Estado');

  for (let i = 1; i < datos.length; i++) {
    if (datos[i][colNroOT] === data.nroOT) {
      sheet.getRange(i + 1, colEstado + 1).setValue(data.estado);
      return { ok: true };
    }
  }
  return { ok: false, error: 'OT no encontrada: ' + data.nroOT };
}

// ============================================================
// ACTUALIZAR OT — fecha programada, horas, estado, técnico
// ============================================================
function actualizarOT(data) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_OTS);
  if (!sheet) return { ok: false, error: 'Hoja OTs no encontrada' };

  const datos   = sheet.getDataRange().getValues();
  const headers = datos[0];
  const colNroOT         = headers.indexOf('NroOT');
  const colFechaProg     = headers.indexOf('FechaProgramada');
  const colHorasEstimada = headers.indexOf('HorasEstimada');
  const colEstado        = headers.indexOf('Estado');
  const colTecnico       = headers.indexOf('Tecnico');
  const colDesc          = headers.indexOf('Descripcion');

  // Soporta tanto nroOT como otNro para compatibilidad
  const nroOT = data.nroOT || data.otNro;

  for (let i = 1; i < datos.length; i++) {
    if (datos[i][colNroOT] === nroOT) {
      const row = i + 1;
      if (data.fechaProgramada !== undefined && colFechaProg     >= 0)
        sheet.getRange(row, colFechaProg     + 1).setValue(data.fechaProgramada);
      if (data.horasEstimadas  !== undefined && colHorasEstimada >= 0)
        sheet.getRange(row, colHorasEstimada + 1).setValue(data.horasEstimadas);
      if (data.estado          !== undefined && colEstado        >= 0)
        sheet.getRange(row, colEstado        + 1).setValue(data.estado);
      if (data.tecnico         !== undefined && colTecnico       >= 0)
        sheet.getRange(row, colTecnico       + 1).setValue(data.tecnico);
      if (data.descripcion     !== undefined && colDesc          >= 0)
        sheet.getRange(row, colDesc          + 1).setValue(data.descripcion);
      return { ok: true, nroOT };
    }
  }
  return { ok: false, error: 'OT no encontrada: ' + nroOT };
}

// ============================================================
// CERRAR OT
// ============================================================
function cerrarOT(data) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_OTS);
  if (!sheet) return { ok: false, error: 'Hoja OTs no encontrada' };

  const datos = sheet.getDataRange().getValues();
  const headers = datos[0];
  const colNroOT      = headers.indexOf('NroOT');
  const colFallaID    = headers.indexOf('FallaID');
  const colEstado     = headers.indexOf('Estado');
  const colHorasReales= headers.indexOf('HorasReales');
  const colRepuestos  = headers.indexOf('Repuestos');
  const colCosto      = headers.indexOf('Costo');
  const colObsCierre  = headers.indexOf('ObservacionesCierre');
  const colFechaCierre= headers.indexOf('FechaCierre');

  let filaEncontrada = -1;
  for (let i = 1; i < datos.length; i++) {
    if (data.otNro && datos[i][colNroOT] === data.otNro) { filaEncontrada = i; break; }
    if (data.fallaId && colFallaID >= 0 && datos[i][colFallaID] === data.fallaId) { filaEncontrada = i; break; }
  }

  if (filaEncontrada >= 0) {
    const row = filaEncontrada + 1;
    if (colEstado >= 0)      sheet.getRange(row, colEstado + 1).setValue('Cerrada');
    if (colHorasReales >= 0) sheet.getRange(row, colHorasReales + 1).setValue(data.horasReales);
    if (colRepuestos >= 0)   sheet.getRange(row, colRepuestos + 1).setValue(data.repuestos || '');
    if (colCosto >= 0)       sheet.getRange(row, colCosto + 1).setValue(data.costo || 0);
    if (colObsCierre >= 0)   sheet.getRange(row, colObsCierre + 1).setValue(data.observaciones || '');
    if (colFechaCierre >= 0) sheet.getRange(row, colFechaCierre + 1).setValue(data.fechaCierre || '');
    sheet.getRange(row, 1, 1, headers.length).setBackground('#d4edda');
  }

  if (data.fallaId) actualizarEstado({ id: data.fallaId, estado: 'Concluido' });
  return { ok: true, otNro: data.otNro || 'encontrada por fallaId' };
}

// ============================================================
// OBTENER FALLAS
// ============================================================
function obtenerFallas(planta) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_FALLAS);
  if (!sheet) return { ok: true, fallas: [] };

  const datos   = sheet.getDataRange().getValues();
  const headers = datos[0];
  let fallas = datos.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      let val = row[i];
      if (val instanceof Date) {
        if (h === 'Fecha') {
          val = Utilities.formatDate(val, 'America/Asuncion', 'yyyy-MM-dd');
        } else if (h === 'Hora') {
          val = Utilities.formatDate(val, 'America/Asuncion', 'HH:mm');
        } else {
          val = Utilities.formatDate(val, 'America/Asuncion', 'yyyy-MM-dd');
        }
      }
      if (h === 'Hora' && typeof val === 'string' && val.includes('T')) {
        val = val.substring(11, 16);
      }
      obj[h] = val;
    });
    return obj;
  }).filter(f => f.ID);

  if (planta) fallas = fallas.filter(f => f.Planta === planta);
  fallas.reverse();
  return { ok: true, fallas };
}

// ============================================================
// OBTENER OTs
// ============================================================
function obtenerOTs(planta) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_OTS);
  if (!sheet) return { ok: true, ots: [] };

  const datos   = sheet.getDataRange().getValues();
  const headers = datos[0];
  let ots = datos.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      let val = row[i];
      if (val instanceof Date) {
        val = Utilities.formatDate(val, 'America/Asuncion', 'yyyy-MM-dd');
      }
      obj[h] = val;
    });
    return obj;
  }).filter(o => o.NroOT);

  if (planta) ots = ots.filter(o => o.Planta === planta);
  ots.reverse();
  return { ok: true, ots };
}

// ============================================================
// NOTIFICACIONES
// ============================================================
function notificarFalla(data) {
  const urgente = data.detenido?.includes('parado');
  const nivel   = urgente ? '[URGENTE]' : '[AVISO]';
  const asunto  = `${nivel} Falla reportada: ${data.equipo} - ${data.planta}`;
  const cuerpo  = [
    'Nuevo reporte de falla en Cimplast',
    urgente ? '*** EQUIPO PARADO ***' : '',
    '',
    'Equipo:   ' + data.equipo,
    'Planta:   ' + data.planta,
    'Sistema:  ' + data.sistema,
    'Operador: ' + data.operador,
    'Turno:    ' + data.turno,
    'Estado:   ' + data.detenido,
    'Fecha:    ' + data.fecha + ' ' + data.hora,
    '',
    'Sintoma:',
    data.sintoma,
    '',
    'ID: ' + data.id
  ].filter(l => l !== undefined).join('\n');

  EMAILS_ALERTA.forEach(email => {
    try { GmailApp.sendEmail(email, asunto, cuerpo); } catch(e) {}
  });

  if (TEAMS_WEBHOOK) {
    try {
      UrlFetchApp.fetch(TEAMS_WEBHOOK, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
          type: 'message',
          attachments: [{
            contentType: 'application/vnd.microsoft.card.adaptive',
            content: {
              type: 'AdaptiveCard',
              version: '1.4',
              body: [
                { type: 'TextBlock', text: `${emoji} FALLA REPORTADA`, weight: 'Bolder', size: 'Medium', color: urgente ? 'Attention' : 'Warning' },
                { type: 'FactSet', facts: [
                  { title: 'Equipo',   value: data.equipo },
                  { title: 'Planta',   value: data.planta },
                  { title: 'Sistema',  value: data.sistema },
                  { title: 'Operador', value: data.operador },
                  { title: 'Estado',   value: data.detenido },
                  { title: 'Hora',     value: `${data.fecha} ${data.hora}` }
                ]},
                { type: 'TextBlock', text: data.sintoma, wrap: true, color: 'Warning' }
              ]
            }
          }]
        })
      });
    } catch(e) {}
  }
}

// ============================================================
// AUTORIZAR DRIVE (ejecutar una vez manualmente)
// ============================================================
function autorizarDrive() {
  DriveApp.getRootFolder();
  Logger.log('Drive autorizado OK');
}
