# Acta técnica — Fase 5: laboratorios documentados

Proyecto: JCF Infra. Fecha de trabajo: 23 de octubre de 2026 (America/Lima).

**Estado: Fase 5 completada; implementación publicada y verificada en producción.**

## Alcance aprobado

Juan aprobó la implementación, integración del PR y publicación en producción del plan consolidado. Se revisan LAB-001/002/003, sus versiones EN/ES, conservación de evidencias, plantilla y documentación. No se exige ni se construye LAB-004.

Base auditada y punto de recuperación: `dfbbbc72c961dc3d65312b3a50a8d0b4190f54d6`; Cloudflare Pages reportó despliegue satisfactorio `8fc8aefa-8a76-42e4-82ef-5c3f982f2fb5` mediante su check de GitHub. Se preserva la copia local previa.

## Cambios realizados

- LAB-001: temporalidad explícita de la revisión del 15/10 y separación respecto de las cuatro capturas del 14/10.
- LAB-002: límite público del fragmento Bicep y de los registros What-If/despliegue; guía de reproducción futura.
- LAB-003: distinción entre identidad histórica de VM y contenido visible; guía futura y transcripción del script E03 con su efecto sobre la página de laboratorio.
- EN/ES: etiquetas de capturas publicadas, referencias al registro de evidencias y límites equivalentes.
- [Registro de evidencias](LABS-EVIDENCE.md), [plantilla reutilizable](LAB-TEMPLATE.md) y [baseline SHA-256](lab-evidence-sha256.json).
- Verificación automática de las 12 imágenes contra el baseline, además del control existente de rutas, enlaces y metadatos.

## Validación

La auditoría previa abrió ocho páginas y doce imágenes públicas en navegador. Se inspeccionaron visualmente las doce copias y se verificaron ocho pares de hashes de originales/copias Azure contra el manifiesto privado de recuperación. Las consultas HTTP de aquella auditoría no resolvieron el dominio desde la herramienta utilizada; no se registraron como HTTP 200.

Validación local de la implementación: Astro check sin errores, advertencias ni hints; build de ocho páginas; verificación de 274 referencias internas, anclas, metadatos, sitemap y doce imágenes satisfactoria. `npm ci` reportó cero vulnerabilidades conocidas en ese momento. Una prueba negativa sobre copias desechables confirmó que alterar simultáneamente la imagen fuente y la compilada provoca rechazo por el baseline fijo; no se alteraron evidencias del repositorio.

La revisión de HTTP/navegador local quedó limitada por permisos de conexión del entorno; no se declara aprobada. Se sustituyó por validación del preview remoto y del dominio productivo:

| Control | Resultado observado |
|---|---|
| Preview HTTPS | Ocho rutas HTTP 200; doce imágenes HTTP 200 con SHA-256 idéntico al baseline; tres recursos compartidos accesibles |
| Preview responsive | Ocho rutas en 1440×900 y 390×844: idioma esperado, un H1, sin desbordamiento horizontal global, sin alt ausente ni anclas internas rotas |
| Revisión visual | Secciones de reproducción revisadas en escritorio y móvil; identidad visual conservada |
| Producción HTTPS | Ocho rutas HTTP 200; doce imágenes HTTP 200 con hashes intactos; cuatro recursos compartidos accesibles |
| Producción navegador | Ocho rutas con idioma y H1 esperados; nuevas etiquetas y guías presentes; contacto mailto correcto |
| Conservación | Ninguna imagen, dependencia ni configuración de infraestructura modificada por el PR |

Cloudflare transforma el enlace de correo en el HTML servido. Una comprobación inicial trató `/cdn-cgi/l/email-protection` como recurso estático y recibió 404; el navegador confirmó que el script de Cloudflare lo convierte en `mailto:juan@jcfinfra.com` en las ocho rutas. Se corrigió la clasificación del comprobador, no el sitio ni Cloudflare. No se afirma que el endpoint intermedio responda 200.

## PR, CI y publicación

- [PR #6 — implementación](https://github.com/jcfinfra/jcfinfra-website/pull/6), integrado mediante squash en la rama protegida `main`.
- Candidato revisado: `5ec52cc0abe71577222793b8dabb8b54e9e250ed`.
- [CI del candidato](https://github.com/jcfinfra/jcfinfra-website/actions/runs/39957078279): satisfactorio.
- [Preview revisado](https://8ee4e212.jcfinfra-website.pages.dev): despliegue `8ee4e212-0512-44b6-9fad-84148602a898`.
- Commit de publicación: [`c0c4ba82c47e82bf6d96d4bc20f32b831514da64`](https://github.com/jcfinfra/jcfinfra-website/commit/c0c4ba82c47e82bf6d96d4bc20f32b831514da64).
- [CI de producción](https://github.com/jcfinfra/jcfinfra-website/actions/runs/39957626701): satisfactorio.
- Cloudflare Pages: despliegue `7574d488-d35a-4cae-b6b3-d67de4b19cb9`, estado success; el panel confirmó Production, rama main y el commit anterior.
- [Sitio verificado](https://jcfinfra.com). Los identificadores anteriores corresponden a la implementación validada; un despliegue documental posterior no los convierte en identificadores del último deployment.

Esta acta y el estado del README se publican mediante un PR documental posterior, bajo la misma autorización y los mismos controles. No cambian el contenido compilado del sitio.

## Límites y cierre

Los resultados Azure/WAF siguen siendo históricos. No se repitieron despliegues Azure, consultas a endpoints antiguos, pruebas de caída, carga, DDoS ni negociación TLS. Las guías nuevas no constituyen resultados ejecutados. No se modifican DNS, WAF, correo, secretos ni dependencias; los originales privados no se publican.

Los criterios de cierre están satisfechos: ocho rutas EN/ES correctas, doce imágenes conservadas, contenido trazable, plantilla disponible, validaciones y CI satisfactorios, preview revisado y publicación autorizada comprobada. No se identificaron errores bloqueantes.

No se realizó una auditoría exhaustiva de accesibilidad, lectores de pantalla, dispositivos físicos ni todos los navegadores. Los resultados no realizados de laboratorio y una futura plantilla completa de despliegue son límites documentados, no bloqueantes. No se exige un cuarto laboratorio. Las fases 6 y 7 permanecen fuera de este alcance.
