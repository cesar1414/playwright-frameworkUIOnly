import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Limpieza global que se ejecuta después de todos los tests
  console.log('🧹 Iniciando limpieza global...');
  
  // Aquí puedes agregar lógica de limpieza como:
  // - Limpiar archivos temporales
  // - Cerrar conexiones a bases de datos
  // - Limpiar datos de prueba
  // - etc.
  
  console.log('✅ Limpieza global completada');
}

export default globalTeardown; 