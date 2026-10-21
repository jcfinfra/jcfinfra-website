# Fase 3 — cierre técnico

Fecha: 21 de octubre de 2026 (America/Lima).

Fases 1 y 2 cerradas: identidad y arquitectura v1.0 aprobadas; inglés principal, español completo y tres laboratorios publicados. Este cierre corresponde a repositorio, dependencias y entrega; no certifica la implementación de todo el diseño aprobado ni una auditoría integral de seguridad.

## Criterios completados

| Criterio | Evidencia |
|---|---|
| Dependencias actualizadas | [PR #2](https://github.com/jcfinfra/jcfinfra-website/pull/2): Astro 7.4.1 y lockfile actualizado |
| CI reproducible y obligatorio | npm ci, auditoría alta/crítica, check y build; acciones fijadas por SHA; check Check and build Astro |
| Protección de main | PR, rama actualizada, conversaciones resueltas, reglas también para administradores; sin force-push/eliminación ni aprobación externa obligatoria |
| Runtime alineado | NODE_VERSION=24.21.0 en preview y producción; confirmado en logs de ambos builds |
| Validación previa | [CI del candidato](https://github.com/jcfinfra/jcfinfra-website/actions/runs/39557601536), preview b019a181-37e8-40db-95de-f75445a22adb |
| Publicación aprobada | Commit c9af1f01355eedd657000f915998da287fa56332; deployment 19f99390-1020-43f6-840e-21f16e005392 |
| CI de main | [Run 39604019659](https://github.com/jcfinfra/jcfinfra-website/actions/runs/39604019659): success |
| Documentación operativa | README con arquitectura, ocho rutas, desarrollo, controles, publicación y recuperación |

Se comprobaron las ocho rutas EN/ES en preview y producción. La preview se revisó en escritorio y móvil de 390 px, sin desbordamiento horizontal global ni imágenes completadas rotas observadas. La validación local incluyó 20 comprobaciones HTTP y hashes de las 12 imágenes. La revisión visual fue por muestras, no una prueba exhaustiva de navegadores o accesibilidad.

La auditoría local posterior a la migración reportó cero vulnerabilidades conocidas en ese momento; el CI remoto superó el umbral alto/crítico. Esto no demuestra ausencia permanente de vulnerabilidades ni intrusión previa. No se alteraron DNS, correo ni WAF.

## Operación y recuperación

1. Antes de cada release, registrar el deployment activo y su commit; no asumir que los identificadores históricos siguientes siguen siendo los actuales.
2. Crear rama y PR; revisar cambios, ambos idiomas y preview. Esperar los checks y la autorización de publicación.
3. Integrar el PR, comprobar el nuevo deployment de main y verificar las ocho rutas, imágenes y navegación del dominio público.
4. Ante una regresión, recuperar el deployment anterior desde Cloudflare Pages y preparar un revert mediante PR. El rollback del dashboard no revierte Git; un despliegue posterior puede sustituirlo. Revisar también la compatibilidad del runtime si el rollback afecta a dependencias.

Punto de recuperación anterior a Astro 7: deployment b77d0716-18f5-4044-a3f1-b125c37749c4, commit afed125029b545ef27e101b655c2001275ceed85. No se ejecutó una restauración de prueba.

## Pendientes no bloqueantes y siguiente paso

- Corregir la etiqueta accesible inglesa de la navegación de la portada ES.
- Revisar el espacio lateral de las tarjetas de portada dentro de la siguiente revisión visual.
- Mantener vigilancia periódica de dependencias; no se ha creado una automatización.
- Verificar e incorporar enlaces de credenciales y CV únicamente cuando exista evidencia autorizada.

La Fase 3 técnica queda cerrada con estos pendientes explícitos. El siguiente trabajo propuesto es contrastar la implementación visual actual con la identidad v1.0 y priorizar diferencias, empezando por navegación bilingüe y accesibilidad. Los nombres y entregables de las fases 4–7 deben recuperarse del tablero maestro original antes de actualizarlo; este documento no inventa ni sustituye ese plan.
