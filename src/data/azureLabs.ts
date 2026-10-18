export const azureLabs = {
  '002': {
    slug: '002-azure-application-gateway', module: 'M5',
    images: ['e01-backend-health.png', 'e02-backend-vm2.png', 'e03-backend-vm1.png'],
    code: `resource vnet 'Microsoft.Network/virtualNetworks@2020-06-01' existing = {
  name: virtualNetworkName
}
resource backendSubnet 'Microsoft.Network/virtualNetworks/subnets@2020-06-01' existing = {
  parent: vnet
  name: subnet2Name
}
// NIC subnet reference:
// id: backendSubnet.id`,
    references: [{ label: 'Microsoft Learn · Bicep existing resources', url: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/existing-resource' }],
    es: {
      title: 'Application Gateway con dos servidores IIS', date: '28 de septiembre de 2026',
      summary: 'Adaptación de Bicep a una red existente, selección de tamaño de VM y validación de dos servidores web detrás de un único punto de entrada.',
      outcome: 'Ambos backends aparecen Healthy con HTTP 200. Las capturas posteriores muestran respuestas de BackendVM1 y BackendVM2. No se realizó una prueba de caída.',
      context: 'El laboratorio M5 se retomó con ContosoVnet, sus subredes y ContosoAppGateway ya desplegados. El objetivo era incorporar dos VM con IIS sin gestionar nuevamente la configuración de esa red.',
      diagram: `Cliente HTTP → frontend público → ContosoAppGateway
ContosoVnet
  AGSubnet → Application Gateway → listener / regla → BackendPool
  BackendSubnet
    ├─ BackendVM1 · 10.0.1.4 · IIS :80
    └─ BackendVM2 · 10.0.1.5 · IIS :80`,
      architectureNote: 'El cliente accedía a una única IP pública del Gateway. Los destinos registrados en el pool eran las IP privadas de las VM. Las direcciones del diagrama son las del laboratorio histórico; no son endpoints actuales para probar.',
      decisions: [
        { title: 'Reutilizar la red con existing', text: 'Se conservaron los originales y se creó main.Juan-existing-network.bicep. La VNet y BackendSubnet se declararon como recursos existing, y las NIC utilizaron backendSubnet.id. El archivo corregido mantiene dos VM, dos NIC y dos extensiones IIS; no declara un nuevo Application Gateway.' },
        { title: 'Adaptar el tamaño a las restricciones disponibles', text: 'El archivo de parámetros corregido usa Standard_D2s_v7, admitido por la plantilla, en lugar de D2s_v5. El historial documenta la elección ante las restricciones de SKU/cuota del entorno. Esto no significa que todas las cuentas Free tengan la misma cuota ni que ese tamaño esté disponible hoy.' },
        { title: 'Validar antes de desplegar', text: 'El historial registra compilación, validación en Cloud Shell y un What-If de seis creaciones y tres recursos ignorados, sin modificaciones ni eliminaciones. Después de la autorización se registró un despliegue incremental satisfactorio. Son resultados históricos del chat, no una ejecución nueva durante esta recuperación.' },
        { title: 'Registrar explícitamente los destinos', text: 'Tras crear las VM, el BackendPool no tenía destinos. Se añadieron 10.0.1.4 y 10.0.1.5. Crear una VM dentro de la VNet no la incorpora automáticamente al pool.' }
      ],
      codeTitle: 'Fragmento recuperado de la plantilla corregida', codeNote: 'Extracto explicativo verificado contra el archivo local. No es una plantilla completa ni incluye credenciales.',
      checks: [
        ['Referencia de red', 'existing en VNet y subred', 'Comprobado en el archivo local; no consulta el estado actual de Azure.'],
        ['Despliegue', 'Succeeded según el historial del chat', 'No se presenta como una nueva prueba ni como evidencia de recursos actualmente activos.'],
        ['Salud de backend', '2/2 Healthy; HTTP 200; puerto 80', 'Captura original E01: conectividad y respuesta del servicio en ese momento.'],
        ['Acceso a la aplicación', 'BackendVM2 y BackendVM1', 'E02/E03 muestran ambos nombres; no prueban reparto 50/50 ni failover.']
      ],
      captions: ['E01 · Dos destinos Healthy; ambos recibieron código 200 por HTTP/80. Se excluyó la cabecera de cuenta.', 'E02 · Respuesta histórica BackendVM2. El recorte conserva el cuerpo; la URL original queda fuera de la copia pública.', 'E03 · Respuesta histórica BackendVM1. El vínculo con el mismo frontend se documenta en los originales y el chat, no en este recorte.'],
      limits: ['Se utilizó HTTP. No se configuraron ni validaron HTTPS, certificados o WAF en este caso.', 'No se detuvo IIS ni se simuló la caída de una VM: no se afirma failover probado.', 'Dos respuestas distintas no prueban distribución uniforme, tolerancia a fallos zonales ni sincronización de datos o sesiones.', 'Los recursos son históricos. No se consultó su estado actual ni se volvió a desplegar; el usuario indicó que realizaba la limpieza al terminar sus laboratorios.'],
      lesson: 'Separar la infraestructura existente de los recursos nuevos, revisar el cambio previsto y validar tanto las sondas como la respuesta que recibe el usuario.',
      provenance: 'Caso recuperado de «Corrige el laboratorio M5 de AZ-700» y de los archivos M5 conservados por Juan. Trabajo guiado con asistencia de IA. Evidencia del 28 de septiembre; recuperación y revisión documental del 16 de octubre de 2026.'
    },
    en: {
      title: 'Application Gateway with two IIS backends', date: '28 September 2026',
      summary: 'Adapting Bicep to an existing network, selecting a VM size and validating two web servers behind a single entry point.',
      outcome: 'Both backends show Healthy with HTTP 200. Subsequent screenshots show responses from BackendVM1 and BackendVM2. No failure test was performed.',
      context: 'The M5 lab resumed with ContosoVnet, its subnets and ContosoAppGateway already deployed. The objective was to add two IIS VMs without managing the existing network configuration again.',
      diagram: `HTTP client → public frontend → ContosoAppGateway
ContosoVnet
  AGSubnet → Application Gateway → listener / rule → BackendPool
  BackendSubnet
    ├─ BackendVM1 · 10.0.1.4 · IIS :80
    └─ BackendVM2 · 10.0.1.5 · IIS :80`,
      architectureNote: 'The client used one public Gateway IP. Private VM addresses were registered as backend targets. Diagram addresses belong to the historical lab; they are not current endpoints to test.',
      decisions: [
        { title: 'Reference the network with existing', text: 'Originals were preserved and main.Juan-existing-network.bicep was created separately. The VNet and BackendSubnet use existing declarations, and NICs reference backendSubnet.id. The corrected file retains two VMs, two NICs and two IIS extensions; it does not declare a new Application Gateway.' },
        { title: 'Adapt the VM size to available constraints', text: 'The corrected parameter file uses Standard_D2s_v7, supported by the template, instead of D2s_v5. History records this choice in response to SKU/quota constraints. It does not establish a universal Free-account quota or current availability of that size.' },
        { title: 'Validate before deployment', text: 'History records compilation, Cloud Shell validation and a What-If with six creates and three ignored resources, without modifications or deletions. An approved incremental deployment was then recorded as successful. These are historical chat results, not new runs during this recovery.' },
        { title: 'Register backend targets explicitly', text: 'After VM creation, BackendPool still had no targets. Addresses 10.0.1.4 and 10.0.1.5 were added. Creating a VM in the VNet does not automatically register it in the pool.' }
      ],
      codeTitle: 'Recovered excerpt from the corrected template', codeNote: 'Illustrative excerpt checked against the local file. It is not a complete deployment template and contains no credentials.',
      checks: [
        ['Network reference', 'existing VNet and subnet', 'Verified in the local file; no current Azure-state query.'],
        ['Deployment', 'Succeeded recorded in chat history', 'Not a fresh test or evidence that resources are still running.'],
        ['Backend health', '2/2 Healthy; HTTP 200; port 80', 'Original E01 screenshot establishes service response at that time.'],
        ['Application access', 'BackendVM2 and BackendVM1', 'E02/E03 show both names; not a 50/50 distribution or failover test.']
      ],
      captions: ['E01 · Two Healthy targets; both received status 200 over HTTP/80. Account header excluded.', 'E02 · Historical BackendVM2 response. The crop retains the body; the original URL is outside the public copy.', 'E03 · Historical BackendVM1 response. The shared frontend is documented in originals and chat, not independently shown by this crop.'],
      limits: ['This case used HTTP. HTTPS, certificates and WAF were not configured or validated.', 'IIS was not stopped and VM failure was not simulated: tested failover is not claimed.', 'Two different responses do not establish uniform distribution, zone-failure resilience or synchronized application data/sessions.', 'Resources are historical. No current-state query or redeployment was performed; the user stated that lab resources were cleaned up after exercises.'],
      lesson: 'Separate existing infrastructure from new resources, review the planned changes, and validate both probes and the user-facing response.',
      provenance: 'Recovered from “Corrige el laboratorio M5 de AZ-700” and Juan’s retained M5 files. Guided work with AI assistance. Evidence dated 28 September; recovered and reviewed on 16 October 2026.'
    }
  },
  '003': {
    slug: '003-azure-internal-load-balancer', module: 'M4',
    images: ['e01-unhealthy.png','e02-extension-error.png','e03-iis-repair.png','e04-healthy.png','e05-client-responses.png'],
    code: `1..15 | ForEach-Object {
    curl.exe -s --no-keepalive http://10.1.2.4
}`,
    references: [{ label: 'Microsoft Learn · Azure Load Balancer algorithm', url: 'https://learn.microsoft.com/en-us/azure/load-balancer/concepts' }],
    es: {
      title: 'Recuperación de un Load Balancer interno', date: '19 de septiembre de 2026',
      summary: 'Diagnóstico de un timeout: de tres backends no saludables a respuestas verificadas de tres servidores IIS a través de una IP privada.',
      outcome: 'Las capturas muestran el cambio de 0% a 100% de instancias saludables y una prueba desde myTestVM que devuelve myVM1, myVM2 y myVM3.',
      context: 'El laboratorio M4 utilizó un Azure Load Balancer Standard interno, tres VM backend y una VM cliente. Juan llegó al chat con el despliegue adaptado parcialmente con ayuda de Claude, pero la prueba a la IP privada terminaba en timeout.',
      diagram: `myTestVM → 10.1.2.4:80 → myIntLoadBalancer (interno)
                       → regla TCP/80 → backend pool
                           ├─ myVM1 · 10.1.0.5 · IIS
                           ├─ myVM2 · 10.1.0.6 · IIS
                           └─ myVM3 · 10.1.0.4 · IIS
Administración histórica: Azure Bastion / Run Command`,
      architectureNote: 'La VIP privada 10.1.2.4 era el punto de entrada del servicio, no la dirección de una VM. La asignación VM/IP procede de la captura de salud. El cliente de la prueba estaba dentro del entorno de red.',
      decisions: [
        { title: 'Separar fallo de aplicación y fallo de balanceador', text: 'El panel mostraba tres destinos Down y timeout del probe. La extensión VMConfig de myVM1 mostraba Provisioning failed: no pudo descargar install-iis.ps1 desde raw.githubusercontent.com. Esa captura identifica un fallo de la dependencia de instalación; no determina qué ruta, firewall o mecanismo de salida lo causó.' },
        { title: 'Reparar IIS antes de recrear infraestructura', text: 'Se utilizó Run Command para instalar Web-Server y escribir el nombre de cada VM en su página inicial. Se comprobó primero una reparación y luego las restantes. La evidencia conserva la ejecución satisfactoria y la recuperación a tres destinos Up.' },
        { title: 'Adaptar la práctica a las restricciones de la cuenta', text: 'Los archivos locales M4 conservados usan Standard_B1s y contienen parámetros separados para myVM1, myVM2 y myVM3. Juan reportó modificaciones por límites de la cuenta y asistencia de Claude. Los archivos demuestran la configuración preparada, pero no prueban por sí solos los tamaños finales desplegados ni una cuota universal de cuatro vCPU.' },
        { title: 'Comprobar más de una respuesta', text: 'El navegador mostraba repetidamente myVM2. Se ejecutaron quince invocaciones independientes de curl.exe desde myTestVM y la salida mostró los tres nombres. El balanceo por flujo no exige que cada recarga de navegador elija una VM distinta.' }
      ],
      codeTitle: 'Comando histórico de validación desde myTestVM', codeNote: 'Transcrito de E05; no se ejecutó durante esta recuperación. Cada iteración lanza un proceso curl independiente. La captura acredita los nombres recibidos, no una medición de distribución estadística.',
      checks: [
        ['Estado inicial', '0% healthy; tres Down', 'E01 muestra el síntoma, no su causa por sí sola.'],
        ['Extensión de instalación', 'VMConfig: descarga fallida', 'E02 corresponde a myVM1; no se generaliza el mismo mensaje a las otras VM sin evidencia.'],
        ['Reparación', 'Web-Server: Success True', 'E03 conserva script y salida de la reparación de myVM1.'],
        ['Estado posterior', '100% healthy; tres Up', 'E04 prueba la salud observada en ese momento.'],
        ['Prueba del cliente', 'Respuestas myVM1 / myVM2 / myVM3', 'E05 demuestra respuestas desde los tres backends; no failover, carga o reparto garantizado.']
      ],
      captions: ['E01 · Tres backends Down y 0% healthy antes de la reparación. Encabezado de cuenta excluido.', 'E02 · VMConfig: fallo al descargar install-iis.ps1 desde GitHub. Se excluyó el identificador de suscripción.', 'E03 · Instalación de IIS y página con nombre de VM; salida Success True de myVM1.', 'E04 · Tres backends Up y 100% healthy tras las reparaciones.', 'E05 · Prueba hacia la VIP privada: quince ejecuciones y respuestas de myVM1, myVM2 y myVM3.'],
      limits: ['No se hizo una nueva consulta a Azure ni se probaron estos endpoints históricos.', 'No se determinó la causa de red exacta del fallo de descarga. No se atribuye automáticamente a la cuenta Free, a un NSG o a la ausencia de NAT.', 'No se afirma failover probado, resistencia a carga, reparto uniforme ni tolerancia a una caída de zona.', 'Los archivos de parámetros son evidencia de preparación; no sustituyen una exportación del estado desplegado.', 'Traffic Manager se evaluó después y quedó bloqueado por cuotas de App Service. Ese intento no forma parte del resultado completado de este caso.'],
      lesson: 'Una VM desplegada no garantiza una aplicación disponible. Correlacionar extensión, servicio, probes y respuesta del cliente evita cambiar el balanceador a ciegas.',
      provenance: 'Recuperado de «Continuar preparación AZ-700», con capturas del 19 de septiembre de 2026 y archivos M4. El usuario informó de trabajo previo asistido por Claude; el diagnóstico y la validación continuaron en ChatGPT. Recuperación documental: 16 de octubre de 2026.'
    },
    en: {
      title: 'Recovering an internal Load Balancer service', date: '19 September 2026',
      summary: 'Diagnosing a timeout: from three unhealthy backends to verified responses from three IIS servers through one private frontend.',
      outcome: 'Screenshots show a change from 0% to 100% healthy instances and a client test from myTestVM returning myVM1, myVM2 and myVM3.',
      context: 'The M4 lab used an internal Azure Standard Load Balancer, three backend VMs and a client VM. Juan arrived with a deployment partly adapted with Claude’s assistance, but the private-IP test timed out.',
      diagram: `myTestVM → 10.1.2.4:80 → myIntLoadBalancer (internal)
                       → TCP/80 rule → backend pool
                           ├─ myVM1 · 10.1.0.5 · IIS
                           ├─ myVM2 · 10.1.0.6 · IIS
                           └─ myVM3 · 10.1.0.4 · IIS
Historical administration: Azure Bastion / Run Command`,
      architectureNote: 'Private VIP 10.1.2.4 was the service entry point, not a VM address. VM/IP mappings come from the health screenshot. The test client was inside the network environment.',
      decisions: [
        { title: 'Separate application failure from load-balancer failure', text: 'The panel showed three Down targets and probe timeouts. myVM1’s VMConfig extension showed Provisioning failed: it could not download install-iis.ps1 from raw.githubusercontent.com. This identifies an installation dependency failure, not the specific route, firewall or outbound mechanism responsible.' },
        { title: 'Repair IIS before recreating infrastructure', text: 'Run Command was used to install Web-Server and write each VM name into its homepage. One repair was checked before continuing with the others. Evidence retains a successful execution and recovery to three Up targets.' },
        { title: 'Adapt the exercise to account constraints', text: 'Retained local M4 files use Standard_B1s and include separate parameter files for myVM1, myVM2 and myVM3. Juan reported changes due to account limits and Claude assistance. These files establish prepared configuration, not final deployed sizes or a universal four-vCPU quota.' },
        { title: 'Validate more than one response', text: 'The browser repeatedly displayed myVM2. Fifteen separate curl.exe invocations from myTestVM then returned all three names. Flow-based distribution does not require every browser refresh to select a different VM.' }
      ],
      codeTitle: 'Historical validation command from myTestVM', codeNote: 'Transcribed from E05; not executed during this recovery. Each iteration starts a separate curl process. The screenshot establishes received names, not statistical distribution.',
      checks: [
        ['Initial state', '0% healthy; three Down', 'E01 establishes the symptom, not its cause alone.'],
        ['Installation extension', 'VMConfig download failure', 'E02 is myVM1 evidence; the same message is not assumed for other VMs.'],
        ['Repair', 'Web-Server: Success True', 'E03 retains the script and successful myVM1 repair output.'],
        ['Later state', '100% healthy; three Up', 'E04 establishes observed health at that time.'],
        ['Client test', 'myVM1 / myVM2 / myVM3 responses', 'E05 demonstrates all three backends responding; not failover, load or guaranteed distribution.']
      ],
      captions: ['E01 · Three Down backends and 0% healthy before repair. Account header excluded.', 'E02 · VMConfig failed to download install-iis.ps1 from GitHub. Subscription identifier excluded.', 'E03 · IIS installation and VM-name page; myVM1 output shows Success True.', 'E04 · Three Up backends and 100% healthy after repairs.', 'E05 · Private-VIP test: fifteen invocations and responses from myVM1, myVM2 and myVM3.'],
      limits: ['No new Azure query or test of these historical endpoints was performed.', 'The exact network cause of the download failure was not established. It is not automatically attributed to Free Trial, an NSG or missing NAT.', 'Tested failover, load resilience, uniform distribution and zone-failure tolerance are not claimed.', 'Parameter files are preparation evidence, not a substitute for exported deployment state.', 'Traffic Manager was attempted later and blocked by App Service quotas. That attempt is not part of this completed case’s outcome.'],
      lesson: 'A deployed VM does not guarantee an available application. Correlating extension status, service, probes and client responses avoids changing the load balancer blindly.',
      provenance: 'Recovered from “Continuar preparación AZ-700”, with 19 September 2026 screenshots and M4 files. The user reported earlier work assisted by Claude; diagnosis and validation continued in ChatGPT. Documentary recovery: 16 October 2026.'
    }
  }
};
