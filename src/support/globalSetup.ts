import { chromium, FullConfig } from '@playwright/test';
import { getConfig } from '../utils/config';

async function globalSetup(config: FullConfig) {
  const { baseUrl } = getConfig();
  
  // Configuración global que se ejecuta antes de todos los tests
  console.log('🚀 Iniciando configuración global...');
  console.log(`📍 URL base configurada: ${baseUrl}`);
  
  // Aquí puedes agregar lógica adicional como:
  // - Limpiar datos de prueba
  // - Configurar datos de prueba
  // - Verificar conectividad con servicios externos
  // - etc.
  
  console.log('✅ Configuración global completada');
}

export default globalSetup; 