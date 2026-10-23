# Acta técnica — Fase 5: laboratorios documentados

Proyecto: JCF Infra. Fecha de trabajo: 23 de octubre de 2026 (America/Lima).

**Estado: implementación preparada; cierre pendiente de CI, preview, integración y verificación productiva.**

## Alcance aprobado

Juan aprobó la implementación, integración del PR y publicación en producción del plan consolidado. Se revisan LAB-001/002/003, sus versiones EN/ES, conservación de evidencias, plantilla y documentación. No se exige ni se construye LAB-004.

Base auditada y punto de recuperación: `dfbbbc72c961dc3d65312b3a50a8d0b4190f54d6`; Cloudflare Pages reportó despliegue satisfactorio `8fc8aefa-8a76-42e4-82ef-5c3f982f2fb5` mediante su check de GitHub. Se preserva la copia local previa.

## Cambios preparados

- LAB-001: temporalidad explícita de la revisión del 15/10 y separación respecto de las cuatro capturas del 14/10.
- LAB-002: límite público del fragmento Bicep y de los registros What-If/despliegue; guía de reproducción futura.
- LAB-003: distinción entre identidad histórica de VM y contenido visible; guía futura y transcripción del script E03 con su efecto sobre la página de laboratorio.
- EN/ES: etiquetas de capturas publicadas, referencias al registro de evidencias y límites equivalentes.
- [Registro de evidencias](LABS-EVIDENCE.md), [plantilla reutilizable](LAB-TEMPLATE.md) y [baseline SHA-256](lab-evidence-sha256.json).
- Verificación automática de las 12 imágenes contra el baseline, además del control existente de rutas, enlaces y metadatos.

## Validación

La auditoría previa abrió ocho páginas y doce imágenes públicas en navegador. Se inspeccionaron visualmente las doce copias y se verificaron ocho pares de hashes de originales/copias Azure contra el manifiesto privado de recuperación. Las consultas HTTP de aquella auditoría no resolvieron el dominio desde la herramienta utilizada; no se registraron como HTTP 200.

Validación local de la implementación: Astro check sin errores, advertencias ni hints; build de ocho páginas; verificación de 274 referencias internas, anclas, metadatos, sitemap y doce imágenes satisfactoria. `npm ci` reportó cero vulnerabilidades conocidas en ese momento. Una prueba negativa sobre copias desechables confirmó que alterar simultáneamente la imagen fuente y la compilada provoca rechazo por el baseline fijo; no se alteraron evidencias del repositorio.

La revisión de HTTP/navegador local quedó limitada por permisos de conexión del entorno; no se declara aprobada. La revisión visual se realizará en el preview remoto. Los identificadores y resultados del PR, CI, preview y producción se completarán con resultados observados. Este documento no anticipa su éxito.

## Límites y cierre

Los resultados Azure/WAF siguen siendo históricos. No se repitieron despliegues Azure, consultas a endpoints antiguos, pruebas de caída, carga, DDoS ni negociación TLS. Las guías nuevas no constituyen resultados ejecutados. No se modifican DNS, WAF, correo, secretos ni dependencias; los originales privados no se publican.

El cierre requiere: ocho rutas EN/ES correctas, doce imágenes conservadas, contenido trazable, plantilla disponible, validaciones y CI satisfactorios, preview revisado y publicación autorizada comprobada. Los resultados no realizados de laboratorio y una futura plantilla completa de despliegue son límites documentados, no bloqueantes de esta fase.
