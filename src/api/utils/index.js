// Importación de modulos para trabajar con rutas

// Convierte la url de archivo del sistema en una ruta valida de Sistema Operativo
import { fileURLToPath } from  'url';

// dirnam extrae el directorio padre de una ruta
// join une rutas como si fuera path.join() esto nos sirve para construir rutas
import {dirname, join} from 'path';

// import.meta.url contiene la url del archivo actual
// fileURLtopath la convierte a ruta local del sistema de archivo
const __filename = fileURLToPath(import.meta.url);

// dirname() da el directoorio actual de este archivo
// con ../../../ retrocedemos 3 niveles en la estructura del proyecto /utils-> /api-> /src-> /tpIntegradorBack
const __dirname = join(dirname(__filename), "../../../"); // apuntamos a la raiz del proyecto

// Exportamos __dirname y join para que otros archivos puedan importar y usar estas herramientas
export {
    __dirname,
    join
}